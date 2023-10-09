import { MaterialCommunityIcons } from '@expo/vector-icons';

import StoreScreen from '@app/(tabs)/(store)/index';
import HomeScreen from '@app/(tabs)/index';

import TabPage from '@/components/Tabs/TabPage';

import { createAnimatedTabsNavigator } from '@/lib/navigation/tabsNavigation';

import Routes from './_routes';

/*
const Component = () => {
	return <TabPage routes={Routes} />;
};
*/

const Tabs = createAnimatedTabsNavigator();

const Component = () => {
	return (
		<Tabs.Navigator>
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
