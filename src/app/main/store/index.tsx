import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RewardScreen from './reward';
import StoreScreen from './storefront';

export type StoreStackParamList = {
	Storefront: undefined;
	Reward: { id: number; name: string; price: number; image: number };
};

const StoreStack = createNativeStackNavigator<StoreStackParamList>();

const Component = () => {
	return (
		<StoreStack.Navigator screenOptions={{ headerShown: false }}>
			<StoreStack.Screen name='Storefront' component={StoreScreen} />
			<StoreStack.Screen name='Reward' component={RewardScreen} />
		</StoreStack.Navigator>
	);
};

export default Component;
