import { useLazyQuery } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useFocusEffect } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Platform, Text, View } from 'react-native';
import tw from 'twrnc';

import CreditCard from '@components/CreditCard';
import HeaderPadding from '@components/HeaderPadding';
import ClaimSuccessModal from '@components/modals/ClaimSuccessModal';
import RecentTransactionList from '@components/RecentTransactionList';
import SafeView from '@components/SafeView';
import Screen from '@components/Screen';
import Topbar from '@components/Topbar';

import Tabbar from '@/components/CustomTabbar';
import Loading from '@/components/Loading';

import { useAuthToken } from '@lib/auth';
import * as GetEcobucksProfile from '@lib/graphql/queries/getEcobucksProfile';

import Gradients from '@/lib/assets/gradients';
import { getFontSize } from '@/lib/fonts';

import { Profile } from '@/types/Profile';

const Component: React.FC = () => {
	const [token, setToken] = useState<string | null>(null);
	const [cardGradient, setCardGradient] = useState<string | null>();

	const [profile, setProfile] = useState<Profile | null>(null);
	const [success, setSuccess] = useState<boolean | null>(null);

	const [displaySuccessModal, setDisplaySuccessModal] = useState(false);

	useAuthToken(setToken);

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
		<Screen tab transition>
			<SafeView style={[Styles.safeArea]}>
				<View style={Styles.safeAreaContent}>
					<HeaderPadding>
						<Topbar
							name={profile.name}
							isOperator={profile.isOperator}
							containerStyle={tw`px-3 pb-0`}
						/>
					</HeaderPadding>
					<View style={Styles.contentContainer}>
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
							style={[Styles.transactions.list]}
							transactions={profile.transactions.map((t) => ({
								action: t.claimId != null ? 'claim' : 'spend',
								credits: t.credits,
								description: t.description,
							}))}
						/>
					</View>
				</View>
			</SafeView>
		</Screen>
	);
};

export default Component;

const Styles = {
	safeArea: [tw`flex-1`, { alignItems: 'center', overflow: 'hidden' }],
	safeAreaContent: [tw`w-full flex-1 overflow-hidden`],
	creditCardContainer: [
		tw`h-auto w-auto rounded-2xl`,
		Platform.OS === 'ios' && tw`shadow-md`,
	],
	contentContainer: [tw`flex w-full px-4 py-0`],
	transactions: {
		list: [tw`w-full`],
		title: [
			tw`text-black/80 pt-15 px-1 pb-4 text-center`,
			{ fontSize: getFontSize(22), fontFamily: 'Syne_600SemiBold' },
		],
	},
};