import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View } from 'react-native';

import StoreScreen from '@app/(tabs)/(store)/index';
import HomeScreen from '@app/(tabs)/index';

export default [
	{
		name: 'Home',
		icon: (focused: boolean) => (
			<MaterialCommunityIcons
				name={focused ? 'home' : 'home-outline'}
				color={focused ? '#000000' : '#00000088'}
				size={27}
			/>
		),
		color: (focused: boolean) => (focused ? '#000000' : '#00000088'),
		component: (
			<View style={{ flexGrow: 1 }}>
				<HomeScreen />
			</View>
		),
	},
	{
		name: 'Store',
		icon: (focused: boolean) => (
			<MaterialCommunityIcons
				name={focused ? 'store' : 'store-outline'}
				color={focused ? '#000000' : '#00000088'}
				size={27}
			/>
		),
		color: (focused: boolean) => (focused ? '#000000' : '#00000088'),
		component: (
			<View style={{ flexGrow: 1 }}>
				<StoreScreen />
			</View>
		),
	},
];
