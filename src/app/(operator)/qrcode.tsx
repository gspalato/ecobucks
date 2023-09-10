import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';

import Button from '@/components/Button';
import HeaderPadding from '@/components/HeaderPadding';

import BackButton from './add/components/BackButton';
import Constants from '@/constants';

const Screen = () => {
	const { id } = useLocalSearchParams();

	if (!id || typeof id !== 'string') return;

	return (
		<SafeAreaView style={tw`flex-1`}>
			<HeaderPadding style={tw`justify-center`}>
				<BackButton style={[tw`pl-2`]} />
				<Text
					numberOfLines={1}
					adjustsFontSizeToFit
					style={[
						tw`absolute w-full items-center justify-center text-center text-2xl font-bold`,
						{
							fontFamily: 'Syne_700Bold',
							alignSelf: 'center',
							pointerEvents: 'none',
						},
					]}
				>
					Claim your credits!
				</Text>
			</HeaderPadding>
			<View style={tw`flex-1 justify-end`}>
				<Button
					text='Proceed'
					buttonStyle={Styles.proceedButton.button}
					textStyle={Styles.proceedButton.text}
					onPress={() => router.replace('/home/')}
				/>
			</View>
			<View style={[Styles.qrcode, { pointerEvents: 'none' }]}>
				<QRCode
					value={(Constants.CLAIM_DISPOSAL_QRCODE_PREFIX + id)!}
					size={300}
					backgroundColor='#f3f3f3'
					enableLinearGradient
					linearGradient={['#00bbff', '#11da33']}
				/>
			</View>
		</SafeAreaView>
	);
};

export default Screen;

const Styles = {
	screen: [tw`flex-1`],
	container: [tw`flex-1 items-center justify-center`],
	qrcode: [
		tw`absolute bottom-0 left-0 right-0 top-0 items-center justify-center`,
	],
	proceedButton: {
		button: [
			tw`h-13 text-4.25 border-transparent mx-auto mb-7 w-80 items-center justify-center rounded-lg bg-[#11da33] p-3 text-center`,
			tw``,
		],
		text: [tw`text-lg text-[#ffffff]`],
	},
};
