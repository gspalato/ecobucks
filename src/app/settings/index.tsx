import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { Button, Text } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import tw from 'twrnc';

import CustomButton from '@/components/Button';
import DefaultHeader from '@/components/DefaultHeader';
import SafeView from '@/components/SafeView';

import { getFontSize } from '@/lib/fonts';
import { SettingsStackParamList } from '@/lib/navigation/types';
import { usePlatform } from '@/lib/platform';

import ChangeCardStyleScreen from './changeCardStyle';
import SettingsScreen from './settings';

const Stack = createNativeStackNavigator<SettingsStackParamList>();

const Component: React.FC = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name='Settings' component={SettingsScreen} />
			<Stack.Screen
				name='ChangeCardStyle'
				component={ChangeCardStyleScreen}
			/>
		</Stack.Navigator>
	);
};

export default Component;

const Styles = {};
