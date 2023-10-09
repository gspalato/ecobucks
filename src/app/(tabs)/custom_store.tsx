import { createStackNavigator } from '@react-navigation/stack';

import StoreScreen from './(store)/index';
import RewardScreen from './(store)/reward';

const Stack = createStackNavigator();

const Component = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name='Store' component={StoreScreen} />
			<Stack.Screen name='Reward' component={RewardScreen} />
		</Stack.Navigator>
	);
};

export default Component;
