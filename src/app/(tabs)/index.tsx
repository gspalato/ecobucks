import { useLazyQuery } from '@apollo/client';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useFocusEffect } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useCallback, useEffect, useState } from 'react';
import { Platform, ScrollView, Text, View } from 'react-native';
import tw from 'twrnc';

import Header from '@components/Header';
import Loading from '@components/Loading';
import RecentTransactionList from '@components/RecentTransactionList';
import SafeView from '@components/SafeView';
import Screen from '@components/Screen';
import Topbar from '@components/Topbar';

import CreditCard from '@/components/CreditCard';
import TabBar from '@/components/Tabs/TabBar';

import { useAuthToken } from '@lib/auth';
import * as GetEcobucksProfile from '@lib/graphql/queries/getEcobucksProfile';

import Gradients from '@/lib/assets/cardStyles';
import { getFontSize } from '@/lib/fonts';
import { useHeaderLayout, useTabBarLayout } from '@/lib/layout';

import { Profile } from '@/types/Profile';

const Component: React.FC = () => {
	const [token, setToken] = useState<string | null>(null);
	const [cardGradient, setCardGradient] = useState<string | null>();

	const [profile, setProfile] = useState<Profile | null>(null);
	const [success, setSuccess] = useState<boolean | null>(null);

	const [displaySuccessModal, setDisplaySuccessModal] = useState(false);

	useAuthToken(setToken);

	const { height: headerHeight } = useHeaderLayout();
	const { height: tabBarHeight } = useTabBarLayout();

	const [fetch] = useLazyQuery<GetEcobucksProfile.ReturnType>(
		GetEcobucksProfile.Query,
		{
			fetchPolicy: 'no-cache',
			onCompleted(data) {
				console.log(data);
				setProfile(data.ecobucksProfile);
				setSuccess(true);
			},
			onError(e) {
				alert(
					`Failed to fetch profile.\n${e.message}\n${
						e.cause
					}\n${e.graphQLErrors.map((e) => e.message)}`,
				);
				setSuccess(false);
			},
		},
	);

	useEffect(() => {
		if (success === false) router.replace('/');
	}, [success]);

	useFocusEffect(
		useCallback(() => {
			// Fetch user selected card gradient background.
			AsyncStorage.getItem('card-gradient', (e, r) => {
				if (e) {
					console.log(e);
					AsyncStorage.setItem('card-gradient', 'Gradient20');
					setCardGradient('Gradient20');
				}

				if (r) setCardGradient(r);
			});

			const update = async () => {
				const token = await SecureStore.getItemAsync('token');
				if (!token) router.replace('/');

				console.log('has token. fetching again...');
				fetch({
					variables: {
						token,
					},
				});
			};

			update();
		}, []),
	);

	if (!profile) return <Loading />;

	return (
		<Screen>
			<View
				style={{
					alignItems: 'center',
					flexGrow: 1,
					overflow: 'hidden',
				}}
			>
				<View
					style={{ flexGrow: 1, overflow: 'hidden', width: '100%' }}
				>
					<ScrollView
						style={Styles.contentContainer}
						contentContainerStyle={{
							paddingTop: headerHeight,
							paddingBottom: tabBarHeight,
						}}
					>
						<View style={Styles.creditCardContainer}>
							<CreditCard
								credits={profile.credits}
								gradient={Gradients[cardGradient!]}
								name={profile.name}
							/>
						</View>
						<Text style={Styles.transactions.title}>
							Recent Transactions
						</Text>
						<RecentTransactionList
							style={{ width: '100%' }}
							transactions={profile.transactions.map((t) => ({
								action: t.claimId != null ? 'claim' : 'spend',
								credits: t.credits,
								description: t.description,
							}))}
						/>
					</ScrollView>
				</View>
			</View>
			<View style={{ flexGrow: 1, position: 'absolute', width: '100%' }}>
				<Header blurIntensity={100}>
					<Topbar
						name={profile.name}
						isOperator={profile.isOperator}
						containerStyle={{
							paddingHorizontal: 7.5,
							paddingBottom: 0,
						}}
					/>
				</Header>
			</View>
		</Screen>
	);
};

export default Component;

const Styles = {
	safeArea: [{ alignItems: 'center', flexGrow: 1, overflow: 'hidden' }],
	safeAreaContent: [{ flexGrow: 1, overflow: 'hidden', width: '100%' }],
	creditCardContainer: [tw`h-auto w-auto rounded-2xl`],
	contentContainer: [tw`flex w-full px-4 py-0`],
	transactions: {
		list: [{ width: '100%' }],
		title: [
			tw`text-black/80 pt-15 px-1 pb-4 text-center`,
			{ fontSize: getFontSize(22), fontFamily: 'Syne_600SemiBold' },
		],
	},
};
