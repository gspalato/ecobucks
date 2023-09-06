import { useLazyQuery } from '@apollo/client';
import { useIsFocused } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, router, Stack, useFocusEffect } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';

import BackButton from '@components/BackButton';
import Topbar from '@components/Topbar';

import { useAuthToken } from '@lib/auth';
import * as GetEcobucksProfile from '@lib/graphql/queries/getEcobucksProfile';

import { Profile } from '@/types/Profile';

import CreditCard from './components/CreditCard';
import OptionButton from './components/OptionButton';

const Screen = () => {
	const isFocused = useIsFocused();

	const [token, setToken] = useState<string | null>(null);
	const [profile, setProfile] = useState<Profile | null>(null);

	const [success, setSuccess] = useState<boolean | null>(null);

	useAuthToken(setToken);

	const [fetch, { loading, error, data }] =
		useLazyQuery<GetEcobucksProfile.ReturnType>(GetEcobucksProfile.Query, {
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
		});

	const fetchProfile = () => {
		if (!token) return;

		fetch({
			variables: {
				token,
			},
		});
	};

	useEffect(() => {
		if (success === false) router.replace('login');
	}, [success]);

	useEffect(fetchProfile, [token]);
	useFocusEffect(
		useCallback(() => {
			console.log('focused.');
			const update = async () => {
				const token = await SecureStore.getItemAsync('token');
				if (!token) return;

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

	if (!profile)
		return (
			<ActivityIndicator
				size='small'
				color='#11da33'
				style={tw`flex-1`}
			/>
		);

	return (
		<>
			<Stack.Screen options={{}} />
			<SafeAreaView style={{ alignItems: 'center' }}>
				<Topbar isOperator={profile.isOperator} />
				<View style={tw`h-full w-full items-start justify-start py-4`}>
					<View style={tw`w-full px-4`}>
						<View
							id='greeting'
							style={tw`flex-row justify-center gap-1`}
						>
							<Text
								style={[
									tw`text-black/50 text-center text-2xl`,
									{ fontFamily: 'Inter' },
								]}
							>
								Welcome back,
							</Text>
							<Text
								style={[
									tw`text-black/50 text-center text-2xl`,
									{ fontFamily: 'Space Grotesk Bold' },
								]}
							>
								{profile.name}!
							</Text>
						</View>
						<CreditCard credits={profile.credits} />
					</View>
				</View>
			</SafeAreaView>
		</>
	);
};

export default Screen;
