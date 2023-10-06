import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import tw from 'twrnc';

import SafeView from '@/components/SafeView';
import TabBar from '@/components/Tabbar';
import TabButton from '@/components/TabButton';

import { getFontSize } from '@/lib/fonts';

const Component = () => {
	const getIconColor = (selected: boolean) =>
		selected ? '#000000' : '#00000044';

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarStyle: [
					{
						position: 'absolute',
						borderTopWidth: 0,
						marginBottom: 0,
						paddingHorizontal: 5,
					},
				],
				tabBarBackground: () => (
					<BlurView
						tint='light'
						intensity={20}
						style={StyleSheet.absoluteFill}
					/>
				),
				tabBarActiveTintColor: '#000000',
				tabBarLabelStyle: [
					{ fontFamily: 'Syne_700Bold', fontSize: getFontSize(12) },
				],
			}}
			safeAreaInsets={{ left: 30, right: 30 }}
		>
			<Tabs.Screen
				name='index'
				options={{
					title: 'Home',
					tabBarIcon: ({ focused, size }) => (
						<Ionicons
							name={focused ? 'home' : 'home-outline'}
							color={getIconColor(focused)}
							size={size}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name='scan'
				options={{
					title: 'Scan',
					tabBarIcon: ({ focused, size }) => (
						<Ionicons
							name='scan'
							color={getIconColor(focused)}
							size={size}
						/>
					),
					tabBarStyle: [{ display: 'none' }],
				}}
			/>
			<Tabs.Screen
				name='map'
				options={{
					title: 'Map',
					tabBarIcon: ({ focused, size }) => (
						<Ionicons
							name={focused ? 'map' : 'map-outline'}
							color={getIconColor(focused)}
							size={size}
						/>
					),
					tabBarStyle: [{ display: 'none' }],
				}}
			/>
			<Tabs.Screen
				name='store'
				options={{
					title: 'Store',
					tabBarIcon: ({ focused, size }) => (
						<Ionicons
							name={focused ? 'gift' : 'gift-outline'}
							color={getIconColor(focused)}
							size={size}
						/>
					),
				}}
			/>
		</Tabs>
	);
};

export default Component;

const Styles = {
	tabs: {
		container: [tw`absolute bottom-0`],
	},
};
