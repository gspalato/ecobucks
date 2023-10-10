import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps';
import tw from 'twrnc';

import DefaultHeader from '@components/DefaultHeader';
import Screen from '@components/Screen';

import { RootStackParamList } from '@/lib/navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Map'>;

const Component: React.FC<Props> = ({ navigation }) => {
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
