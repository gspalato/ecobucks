import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { Button, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import tw from 'twrnc';

import BackButton from '@/components/BackButton';
import CustomButton from '@/components/Button';
import HeaderPadding from '@/components/HeaderPadding';
import SafeView from '@/components/SafeView';

import { fontSizes, getFontSize } from '@/lib/fonts';
import { usePlatform } from '@/lib/platform';

const Screen = () => {
	const { isIOS } = usePlatform();

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
					Settings
				</Text>
			</HeaderPadding>
			<ScrollView style={tw`flex-1`}>
				<CustomButton
					text='Change Card Style'
					buttonStyle={[
						tw`bg-transparent border-b border-[#00000011]`,
					]}
					textStyle={[
						tw`text-black`,
						{ fontFamily: 'Inter_600SemiBold' },
					]}
					onPress={() => router.push('/settings/changeCardColor')}
				/>
			</ScrollView>
			{isIOS ? (
				<Button title='Log Out' onPress={logout} />
			) : (
				<TouchableOpacity style={[tw`w-full bg-none`]} onPress={logout}>
					<Text
						style={[
							tw`text-center text-[#3478f6]`,
							{ fontSize: getFontSize(16) },
						]}
					>
						Log Out
					</Text>
				</TouchableOpacity>
			)}
		</SafeView>
	);
};

export default Screen;

const Styles = {};
