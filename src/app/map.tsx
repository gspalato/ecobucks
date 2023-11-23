import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import tw from 'twrnc';

import DefaultHeader from '@components/DefaultHeader';
import Screen from '@components/Screen';

import CardStyles from '@lib/assets/cardStyles';

import FoundationClient from '@/lib/api/client';
import { useAuth } from '@/lib/auth';
import { RootStackParamList } from '@/lib/navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Map'>;

const Component: React.FC<Props> = ({ navigation }) => {
	const [loading, setLoading] = useState(true);

	const [locations, setLocations] = useState<
		{ latitude: number; longitude: number }[]
	>([]);
	const [location, setLocation] = useState<Location.LocationObject | null>(
		null,
	);
	const [errorMsg, setErrorMsg] = useState<string | null>(null);

	const { token } = useAuth();

	useEffect(() => {
		const getMyLocation = async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				setErrorMsg('Permission to access location was denied');
				return;
			}

			let location = await Location.getCurrentPositionAsync({});
			setLocation(location);
		};

		getMyLocation();
	}, []);

	useEffect(() => {
		const fetchStations = async () => {
			if (!token) {
				console.log('No token provided.');
				return;
			}

			const response = await FoundationClient.GetEcobucksStations(token);
			console.log(response);
			if (!response.ok) {
				console.log('Failed to fetch stations.');
				return;
			}

			const payload = await response.json();
			if (!payload.successful) {
				console.log('Failed to fetch stations.');
				return;
			}

			console.log(payload);
			setLocations(payload.stations);
		};

		fetchStations();
		console.log('Fetching stations...');
	}, [token]);

	useEffect(() => console.log(locations), [locations]);

	return (
		<Screen>
			<View style={tw`flex-1`}>
				<MapView
					style={tw`absolute z-0 h-full w-full`}
					showsUserLocation={true}
				>
					{locations.map((location) => {
						console.log(location);
						return (
							<Marker
								coordinate={{
									latitude: location.latitude,
									longitude: location.longitude,
								}}
								icon={CardStyles.Gradient20}
								pinColor='#11da23'
								zIndex={10}
							/>
						);
					})}
				</MapView>
			</View>
			<View style={{ flex: 1, position: 'absolute', width: '100%' }}>
				<DefaultHeader
					backButtonColor='#000000'
					blurIntensity={0}
					blurTint='dark'
					headerStyle={{
						backgroundColor: '#00000000',
						justifyContent: 'center',
						width: '100%',
					}}
					title='Map'
					titleStyle={{ color: '#000000' }}
				/>
			</View>
		</Screen>
	);
};

export default Component;
