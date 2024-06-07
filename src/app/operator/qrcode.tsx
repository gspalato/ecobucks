import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';

import BackButton from '@components/BackButton';
import Button from '@components/Button';
import Header from '@components/Header';

import DefaultHeader from '@/components/DefaultHeader';

import { fontSizes, getFontSize } from '@lib/fonts';

import { RootStackParamList } from '@/lib/navigation/types';

import Constants from '@/constants';
import { Spacings } from '@/styles';

type Props = StackScreenProps<RootStackParamList, 'QRCode'>;

const Screen: React.FC<Props> = (props) => {
	const { navigation, route } = props;
	const { id, credits } = route.params;

	return (
		<>
			<SafeAreaView style={{ backgroundColor: '#ffffff', flexGrow: 1 }}>
				<View
					style={{
						alignItems: 'center',
						flexGrow: 1,
						justifyContent: 'flex-end',
					}}
				>
					<Button
						text='Proceed'
						buttonStyle={{
							height: 20 * Spacings.Unit,
							width: 100 * Spacings.Unit,
						}}
						textStyle={Styles.proceedButton.text}
						onPress={() => navigation.replace('Main')}
					/>
				</View>
				<View style={[Styles.qrcode, { pointerEvents: 'none' }]}>
					<QRCode
						value={id!}
						size={300}
						backgroundColor='#ffffff'
						enableLinearGradient
						linearGradient={['#00bbff', '#11da33']}
					/>
					<Text style={Styles.credits}>+${credits}</Text>
				</View>
			</SafeAreaView>
			<View style={{ flex: 1, position: 'absolute', width: '100%' }}>
				<DefaultHeader
					title={'Claim your credits!'}
					blurIntensity={90}
				/>
			</View>
		</>
	);
};

export default Screen;

const Styles = {
	screen: [tw`flex-1`],
	container: [tw`flex-1 items-center justify-center`],
	qrcode: [
		tw`absolute bottom-0 left-0 right-0 top-0 items-center justify-center`,
	],
	credits: [
		tw`pt-4`,
		{
			color: '#11da33',
			fontFamily: 'BricolageGrotesque_700Bold',
			fontSize: getFontSize(25),
		},
	],
	proceedButton: {
		button: [
			tw`h-13 border-transparent mx-auto mb-7 w-80 rounded-lg bg-[#11da33] p-3 text-center`,
			{
				fontSize: getFontSize(17),
			},
		],
		text: [tw`text-lg text-[#ffffff]`],
	},
};
