import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SettingsStackParamList } from '@/lib/navigation/types';

import ChangeCardStyleScreen from './changeCardStyle';
import MainSettingsScreen from './settings';

const Stack = createNativeStackNavigator<SettingsStackParamList>();

const Component: React.FC = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name='Main' component={MainSettingsScreen} />
			<Stack.Screen
				name='ChangeCardStyle'
				component={ChangeCardStyleScreen}
			/>
		</Stack.Navigator>
	);
};

export default Component;
