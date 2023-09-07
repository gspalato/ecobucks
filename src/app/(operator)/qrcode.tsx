import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';

import Button from '@/components/Button';

const Screen = () => {
	const { id } = useLocalSearchParams();

	if (!id || typeof id !== 'string') return;

	return (
		<SafeAreaView style={Styles.screen}>
			<Text
				style={[
					tw`text-bold mx-auto mt-10 text-4xl`,
					{ fontFamily: 'Inter Bold' },
				]}
			>
				Claim your credits!
			</Text>
			<View style={Styles.container}>
				<QRCode value={id!} size={300} backgroundColor='#eeeeee' />
			</View>
			<Button
				text='Proceed!'
				buttonStyle={Styles.proceedButton.button}
				textStyle={Styles.proceedButton.text}
				onPress={() => router.replace('/home/')}
			/>
		</SafeAreaView>
	);
};

export default Screen;

const Styles = {
	screen: [tw`flex-1`],
	container: [tw`flex-1 items-center justify-center`],
	proceedButton: {
		button: [
			tw`h-13 text-4.25 border-transparent mx-auto w-80 items-center justify-center rounded-lg bg-[#11da33] p-3 text-center`,
		],
		text: [tw`text-lg text-[#ffffff]`],
	},
};
