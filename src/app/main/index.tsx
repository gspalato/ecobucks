import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Animated } from 'react-native';

import { createAnimatedTabsNavigator } from '@/lib/navigation/createAnimatedTabsNavigator';

import HomeScreen from './home';
import StoreScreen from './store';

export type MainTabsParamList = {
	Home: undefined;
	Store: undefined;
};

const Tabs = createAnimatedTabsNavigator<MainTabsParamList>();

const Component = () => {
	const AnimatedIcon = Animated.createAnimatedComponent(
		MaterialCommunityIcons,
	);

	return (
		<Tabs.Navigator screenOptions={{ unmountOnBlur: false }}>
			<Tabs.Screen
				name='Home'
				component={HomeScreen}
				options={{
					icon: (focused: boolean, color: any) => (
						<AnimatedIcon
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
						<AnimatedIcon
							name={'store-outline'}
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
