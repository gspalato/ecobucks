import { useLazyQuery } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import * as NavigationBar from 'expo-navigation-bar';
import { SplashScreen } from 'expo-router';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

import LoginScreen from '@app/login';
import MapScreen from '@app/map';
import ScanScreen from '@app/scan';
import SettingsScreen from '@app/settings';

import useAssets from '@/lib/assets';
import Gradients from '@/lib/assets/gradients';
import { useAuthToken } from '@/lib/auth';
import fonts from '@/lib/fonts';
import { CheckAuth } from '@/lib/graphql/queries';

export type RootStackParamList = {
	Login: undefined;
	Home: undefined;
	Main: undefined;
	Scan: undefined;
	Map: undefined;
	Settings: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
	const [logged, setLogged] = useState(false);
	const [token, setToken] = useState<string | null>(null);

	useAuthToken(setToken);

	const { loaded: assetsLoaded, ...Assets } = useAssets();

	const [fontsLoaded, error] = useFonts(fonts);

	const [showSplashScreen, setShowSplashScreen] = useState(true);

	useEffect(() => {
		if (Platform.OS != 'android') return;

		NavigationBar.setPositionAsync('absolute');
		NavigationBar.setBackgroundColorAsync('#ffffff00');
	}, []);

	useEffect(() => {
		if (!error) return;

		console.log(error);
	}, [error]);

	useEffect(() => {
		Object.values(Gradients).forEach((g) => {
			Assets.preload(g);
		});

		Assets.wait();
	}, []);

	useEffect(() => {
		if (assetsLoaded && fontsLoaded) {
			SplashScreen.hideAsync();
			setShowSplashScreen(false);
		}
	}, [assetsLoaded, fontsLoaded]);

	const [check, { loading: loadingCheck }] = useLazyQuery(CheckAuth.Query, {
		fetchPolicy: 'no-cache',
		variables: {
			token,
		},
		onCompleted: (data) => {
			console.log(data);
			setLogged(data.checkAuthentication.successful);
		},
		onError: (e) => {},
	});

	useEffect(() => {
		check();
	}, []);

	if (!fontsLoaded) return;

	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name='Login' component={LoginScreen} />
			<Stack.Screen name='Main' component={() => <></>} />
			<Stack.Screen name='Scan' component={ScanScreen} />
			<Stack.Screen name='Map' component={MapScreen} />
			<Stack.Screen name='Settings' component={SettingsScreen} />
		</Stack.Navigator>
	);
};

export default App;
