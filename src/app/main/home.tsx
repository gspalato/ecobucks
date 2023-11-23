import { Foundation } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import type { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import CreditCard from '@components/CreditCard';
import Header from '@components/Header';
import Loading from '@components/Loading';
import RecentTransactionList from '@components/RecentTransactionList';
import Screen from '@components/Screen';
import Topbar from '@components/Topbar';

import { useAuth, useProfile } from '@lib/auth';
import { fontSizes } from '@lib/fonts';
import { useHeaderLayout, useTabBarLayout } from '@lib/layout';
import { MainTabsParamList } from '@lib/navigation/types';

import FoundationClient from '@/lib/api/client';
import { RootStackParamList } from '@/lib/navigation/types';

import { Colors, Spacings } from '@/styles';

type Props = CompositeScreenProps<
	StackScreenProps<MainTabsParamList, 'Home'>,
	NativeStackScreenProps<RootStackParamList, 'Main'>
>;

const Component: React.FC<Props> = (props) => {
	const { token } = useAuth();

	const { height: headerHeight } = useHeaderLayout();
	const { height: tabBarHeight } = useTabBarLayout();

	const { logout } = useAuth();
	const { profile, fetch } = useProfile(token);

	useEffect(() => {
		if (profile && token)
			FoundationClient.RunLocationLoopAsync(profile?.id, token);
	}, [profile, token]);

	useFocusEffect(
		useCallback(() => {
			const update = async () => {
				if (!token) logout();

				console.log('Refetching profile...');
				fetch(token);
			};

			update();
		}, []),
	);

	if (!profile) return <Loading />;

	return (
		<>
			<Screen style={{ backgroundColor: Colors.Background }}>
				<ScrollView
					style={[
						{ backgroundColor: Colors.Background },
						Styles.contentContainer,
					]}
					contentContainerStyle={{
						paddingTop: headerHeight + 10,
						paddingBottom: tabBarHeight,
					}}
				>
					<CreditCard credits={profile.credits} name={profile.name} />
					<Text style={Styles.transactionsTitle}>Recent</Text>
					<RecentTransactionList
						style={{
							paddingHorizontal: 2 * Spacings.Unit,
							width: '100%',
						}}
						transactions={profile.transactions.map((t) => ({
							action: t.claimId != null ? 'claim' : 'spend',
							credits: t.credits,
							description: t.description,
						}))}
					/>
				</ScrollView>
				<View
					style={{ flexGrow: 1, position: 'absolute', width: '100%' }}
				>
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
		</>
	);
};

export default Component;

const Styles = StyleSheet.create({
	contentContainer: {
		display: 'flex',
		paddingHorizontal: 9 * Spacings.Unit,
		paddingVertical: 0,
		width: '100%',
	},
	transactionsList: { width: '100%' },
	transactionsTitle: {
		color: Colors.Text,
		fontSize: fontSizes.md,
		fontFamily: 'Syne_600SemiBold',
		paddingBottom: 7.5 * Spacings.Unit,
		paddingHorizontal: 2 * Spacings.Unit,
		paddingTop: 20 * Spacings.Unit,
		textAlign: 'left',
	},
});
