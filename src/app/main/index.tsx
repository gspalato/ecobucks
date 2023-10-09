import { MaterialCommunityIcons } from '@expo/vector-icons';

import { createAnimatedTabsNavigator } from '@/lib/navigation/tabsNavigation';

import HomeScreen from './home';
import StoreScreen from './store';

export type MainTabsParamList = {
	Home: undefined;
	Store: undefined;
};

const Tabs = createAnimatedTabsNavigator<MainTabsParamList>();

const Component = () => {
	return (
		<Tabs.Navigator screenOptions={{ unmountOnBlur: false }}>
			<Tabs.Screen
				name='Home'
				component={HomeScreen}
				options={{
					icon: (focused: boolean) => (
						<MaterialCommunityIcons
							name={focused ? 'home' : 'home-outline'}
							color={focused ? '#000000' : '#00000088'}
							size={27}
						/>
					),
					color: (focused: boolean) =>
						focused ? '#000000' : '#00000088',
				}}
			/>
			<Tabs.Screen
				name='Store'
				component={StoreScreen}
				options={{
					icon: (focused: boolean) => (
						<MaterialCommunityIcons
							name={focused ? 'store' : 'store-outline'}
							color={focused ? '#000000' : '#00000088'}
							size={27}
						/>
					),
					color: (focused: boolean) =>
						focused ? '#000000' : '#00000088',
				}}
			/>
		</Tabs.Navigator>
	);
};

export default Component;
