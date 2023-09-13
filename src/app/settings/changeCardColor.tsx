import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { Button, Text, View } from 'react-native';
import tw from 'twrnc';

import BackButton from '@/components/BackButton';
import HeaderPadding from '@/components/HeaderPadding';
import SafeView from '@/components/SafeView';

import { fontSizes } from '@/lib/fonts';

const Screen = () => {
	const logout = () => {
		SecureStore.deleteItemAsync('token').then(() => {
			router.replace('/');
		});
	};

	return (
		<SafeView style={[tw`flex-1`]}>
			<HeaderPadding style={tw`justify-center`}>
				<BackButton style={[tw`pl-2`]} />
				<Text
					numberOfLines={1}
					adjustsFontSizeToFit
					style={[
						tw`absolute w-full items-center justify-center text-center text-2xl`,
						{
							fontFamily: 'Syne_700Bold',
							alignSelf: 'center',
							pointerEvents: 'none',
							fontSize: fontSizes.title,
						},
					]}
				>
					Change Card Color
				</Text>
			</HeaderPadding>
			<View style={tw`flex-1`}></View>
		</SafeView>
	);
};

export default Screen;

const Styles = {};
