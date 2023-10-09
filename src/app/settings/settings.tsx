import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';
import React from 'react';
import { Button, ScrollView, Text, TouchableOpacity } from 'react-native';

import CustomButton from '@/components/Button';
import DefaultHeader from '@/components/DefaultHeader';
import SafeView from '@/components/SafeView';

import { getFontSize } from '@/lib/fonts';
import {
	RootStackParamList,
	SettingsStackParamList,
} from '@/lib/navigation/types';
import { usePlatform } from '@/lib/platform';
import tw from '@/lib/tailwind';

type Props = CompositeScreenProps<
	NativeStackScreenProps<SettingsStackParamList, 'Settings'>,
	NativeStackScreenProps<RootStackParamList, 'Main'>
>;

const Component: React.FC<Props> = (props) => {
	const { navigation } = props;

	const { isIOS } = usePlatform();

	const logout = () => {
		SecureStore.deleteItemAsync('token').then(() => {
			navigation.replace('Login');
		});
	};

	return (
		<SafeView safeHeader style={[tw`flex-1`]}>
			<DefaultHeader title='Settings' />
			<ScrollView style={tw`flex-1`}>
				<CustomButton
					text='Change Card Style'
					buttonStyle={{
						backgroundColor: '#ffffff00',
						borderBottomWidth: 1,
						borderColor: '#00000011',
					}}
					textStyle={{
						color: '#000000',
						fontFamily: 'Syne_600SemiBold',
					}}
					onPress={() => navigation.push('ChangeCardStyle')}
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

export default Component;
