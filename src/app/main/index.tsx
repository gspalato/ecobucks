import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Animated } from 'react-native';

import { createAnimatedTabsNavigator } from '@/lib/navigation/createAnimatedTabsNavigator';
import { MainTabsParamList } from '@/lib/navigation/types';

import HomeScreen from './home';
import StoreScreen from './store';

import SettingsScreen from '../settings';

const AnimatedMaterialCommunityIcon = Animated.createAnimatedComponent(
	MaterialCommunityIcons,
);

const Tabs = createAnimatedTabsNavigator<MainTabsParamList>();

const Component = () => {
	return (
		<Tabs.Navigator screenOptions={{ unmountOnBlur: false }}>
			<Tabs.Screen
				name='Home'
				component={HomeScreen}
				options={{
					icon: (focused: boolean, color: any) => (
						<AnimatedMaterialCommunityIcon
							name={'home-outline'}
							size={27}
							style={{ color }}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name='Store'
				component={StoreScreen}
				options={{
					icon: (focused: boolean, color: any) => (
						<AnimatedMaterialCommunityIcon
							name={'store-outline'}
							size={27}
							style={{ color }}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name='Settings'
				component={SettingsScreen}
				options={{
					icon: (focused: boolean, color: any) => (
						<AnimatedMaterialCommunityIcon
							name={'cog-outline'}
							size={27}
							style={{ color }}
						/>
					),
				}}
			/>
		</Tabs.Navigator>
	);
};

export default Component;
