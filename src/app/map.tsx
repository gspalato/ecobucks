import { Feather } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';
import tw from 'twrnc';

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
				<BackButton />
				<MapView
					style={tw`absolute z-0 h-full w-full`}
					showsUserLocation={true}
				/>
			</View>
		</>
	);
};

export default Screen;

const BackButton: React.FC = () => {
	const onPress = () => {
		router.replace('/home/');
	};

	return (
		<Pressable onPress={onPress}>
			<View style={[tw`absolute z-10 p-1`]}>
				<Feather size={35} name='chevron-left' color={'#ffffff'} />
			</View>
		</Pressable>
	);
};
