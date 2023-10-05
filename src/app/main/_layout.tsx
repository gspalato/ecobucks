import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
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
				tabBarStyle: [{ borderTopWidth: 0, marginBottom: 5 }],
				tabBarBackground: () => <BlurView />,
				tabBarActiveTintColor: '#000000',
				tabBarLabelStyle: [
					{ fontFamily: 'Syne_700Bold', fontSize: getFontSize(12) },
				],
			}}
		>
			<Tabs.Screen
				name='index'
				options={{
					title: 'Home',
					tabBarIcon: (props) => (
						<Ionicons
							name='home-outline'
							color={getIconColor(props.focused)}
							size={props.size}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name='scan'
				options={{
					title: 'Scan',
					tabBarIcon: (props) => (
						<Ionicons
							name='scan'
							color={getIconColor(props.focused)}
							size={props.size}
						/>
					),
					tabBarStyle: [{ display: 'none' }],
				}}
			/>
			<Tabs.Screen
				name='map'
				options={{
					title: 'Map',
					tabBarIcon: (props) => (
						<Ionicons
							name='map-outline'
							color={getIconColor(props.focused)}
							size={props.size}
						/>
					),
					tabBarStyle: [{ display: 'none' }],
				}}
			/>
			<Tabs.Screen
				name='store'
				options={{
					title: 'Store',
					tabBarIcon: (props) => (
						<Ionicons
							name='gift-outline'
							color={getIconColor(props.focused)}
							size={props.size}
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
