import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps';
import tw from 'twrnc';

import DefaultHeader from '@/components/DefaultHeader';
import SafeView from '@/components/SafeView';

const Screen: React.FC<any> = ({ navigation }) => {
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
		<>
			<View style={tw`flex-1`}>
				<MapView
					style={tw`absolute z-0 h-full w-full`}
					showsUserLocation={true}
				/>
			</View>
			<SafeView style={[tw`absolute w-full flex-1`]}>
				<DefaultHeader
					headerStyle={tw`w-full justify-center`}
					backButtonColor='#ffffff'
					titleStyle={[tw`text-white`]}
					title='Map'
				/>
			</SafeView>
		</>
	);
};

export default Screen;
