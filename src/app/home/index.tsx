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
				<Topbar />
				<View style={tw`h-full w-full items-start justify-start py-4`}>
					<View style={tw`w-full px-4`}>
						<View
							id='greeting'
							style={tw`flex-row justify-center gap-1`}
						>
							<Text
								style={[
									tw`text-center text-2xl text-black/50`,
									{ fontFamily: 'Inter' },
								]}
							>
								Welcome back,
							</Text>
							<Text
								style={[
									tw`text-center text-2xl text-black/50`,
									{ fontFamily: 'Space Grotesk Bold' },
								]}
							>
								{profile.name}!
							</Text>
						</View>
						<View
							id='card_representation'
							style={tw`mx-auto mt-5 flex aspect-video w-[95%] items-center justify-center overflow-hidden rounded-2xl border border-[#00000011] bg-[#f0f0f5] shadow-md`}
						>
							<LinearGradient
								colors={['#ebebed', '#ffffff', '#ebebed']}
								style={tw`absolute h-full w-full rounded-2xl`}
								locations={[0.25, 0.5, 0.75]}
								start={{ x: 0, y: 1 }}
								end={{ x: 1, y: 0 }}
							/>
							<Text
								style={[
									{
										fontFamily: 'Space Grotesk Bold',
										fontSize: 140,
									},
									tw`text-black/05 -bottom-15 absolute mx-auto font-bold`,
								]}
							>
								credit
							</Text>
							<Text
								style={[
									tw`leading-0 text-7xl font-bold text-[#11da33]`,
									{ fontFamily: 'Space Grotesk Bold' },
								]}
							>
								${profile?.credits || '0'}
							</Text>
						</View>
					</View>
					{/*
					<FlatList
						data={UserOptions}
						renderItem={
							({ item }) => (
								<OptionButton
									text={item.name}
									buttonStyle={tw`min-w-10 w-35`}
									onPress={() => router.push(item.path)}
								/>
							)
						}
						horizontal
						contentContainerStyle={tw`justify-around gap-2 px-2 w-full mt-5`}
					/>*/}
				</View>
			</SafeAreaView>
		</>
	);
};

export default Screen;

const UserOptions = [
	{
		name: 'Scan',
		icon: 'qrcode',
		color: '#11da33',
		path: 'scan',
	},
	{
		name: 'Locations',
		icon: 'map-marker-alt',
		color: '#11da33',
		path: 'map',
	},
];

const OperatorOptions = [
	{
		name: 'Register',
		icon: 'user-plus',
		color: '#11da33',
		path: 'register',
	},
];
