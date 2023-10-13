import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';
import React from 'react';
import { Button, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import CustomButton from '@/components/Button';
import DefaultHeader from '@/components/DefaultHeader';
import SafeView from '@/components/SafeView';

import { getFontSize } from '@/lib/fonts';
import { useHeaderLayout, useTabBarLayout } from '@/lib/layout';
import {
	MainTabsParamList,
	RootStackParamList,
	SettingsStackParamList,
} from '@/lib/navigation/types';
import { usePlatform } from '@/lib/platform';
import tw from '@/lib/tailwind';

import { Defaults } from '@/styles';

type Props = CompositeScreenProps<
	NativeStackScreenProps<SettingsStackParamList, 'Main'>,
	NativeStackScreenProps<RootStackParamList, 'Settings'>
>;

const Component: React.FC<Props> = (props) => {
	const { navigation } = props;

	const { isIOS } = usePlatform();

	const { height: headerHeight } = useHeaderLayout();
	const { height: tabBarHeight } = useTabBarLayout();

	const logout = () => {
		SecureStore.deleteItemAsync('token').then(() => {
			navigation.replace('Login');
		});
	};

	return (
		<>
			<View
				style={[
					Defaults.View,
					{ flex: 1, paddingBottom: tabBarHeight },
				]}
			>
				<ScrollView
					style={{
						flex: 1,
						paddingTop: headerHeight,
					}}
				>
					<CustomButton
						text='Change Card Style'
						buttonStyle={{
							backgroundColor: '#ffffff00',
							borderBottomWidth: 1,
							borderColor: '#00000011',
							width: '100%',
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
					<TouchableOpacity
						style={{ backgroundColor: '#fff0', width: '100%' }}
						onPress={logout}
					>
						<Text
							style={{
								color: '#3478f6',
								fontSize: getFontSize(16),
								textAlign: 'center',
							}}
						>
							Log Out
						</Text>
					</TouchableOpacity>
				)}
			</View>
			<View style={{ flexGrow: 1, position: 'absolute', width: '100%' }}>
				<DefaultHeader
					showBackButton={false}
					title='Settings'
					blurIntensity={90}
				/>
			</View>
		</>
	);
};

export default Component;
