import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { Button, Text } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import tw from 'twrnc';

import CustomButton from '@/components/Button';
import DefaultHeader from '@/components/DefaultHeader';
import SafeView from '@/components/SafeView';

import { getFontSize } from '@/lib/fonts';
import { usePlatform } from '@/lib/platform';

const Screen = () => {
	const { isIOS } = usePlatform();

	const logout = () => {
		SecureStore.deleteItemAsync('token').then(() => {
			router.replace('/');
		});
	};

	return (
		<SafeView safeHeader style={[tw`flex-1`]}>
			<DefaultHeader title='Settings' />
			<ScrollView style={tw`flex-1`}>
				<CustomButton
					text='Change Card Style'
					buttonStyle={[
						tw`bg-transparent border-b border-[#00000011]`,
					]}
					textStyle={[
						tw`text-black`,
						{ fontFamily: 'Syne_600SemiBold' },
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
