import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps';
import tw from 'twrnc';

import DefaultHeader from '@components/DefaultHeader';
import Screen from '@components/Screen';

import Loading from '@/components/Loading';

const Component: React.FC<any> = ({ navigation }) => {
	const [loading, setLoading] = useState(true);

	const [location, setLocation] = useState<Location.LocationObject | null>(
		null,
	);
	const [errorMsg, setErrorMsg] = useState<string | null>(null);

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				setErrorMsg('Permission to access location was denied');
				return;
			}

			let location = await Location.getCurrentPositionAsync({});
			setLocation(location);
		})();
	}, []);

	return (
		<Screen>
			<View style={tw`flex-1`}>
				<MapView
					style={tw`absolute z-0 h-full w-full`}
					showsUserLocation={true}
				/>
			</View>
			<View style={[tw`absolute w-full flex-1`]}>
				<DefaultHeader
					backButtonColor='#ffffff'
					blurIntensity={0}
					blurTint='dark'
					headerStyle={tw`w-full justify-center`}
					title='Map'
					titleStyle={[tw`text-white`]}
				/>
			</View>
		</Screen>
	);
};

export default Component;
