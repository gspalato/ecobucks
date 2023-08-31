import { Stack } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';
import tw from 'twrnc';

import BackButton from '@components/BackButton';

const Screen = () => {
	return (
		<>
			<View style={tw`flex-1`}>
				<MapView style={tw`h-full w-full`} />
			</View>
		</>
	);
};

export default Screen;
