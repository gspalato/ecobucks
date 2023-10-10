import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useLazyQuery } from '@apollo/client';
import { PortalProvider } from '@gorhom/portal';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as NavigationBar from 'expo-navigation-bar';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { ModalProvider } from 'react-native-modalfy';

import LoginScreen from '@app/login';
import MainScreen from '@app/main';
import MapScreen from '@app/map';
import AddScreen from '@app/operator/add';
import QRCodeScreen from '@app/operator/qrcode';
import ScanScreen from '@app/scan';
import SettingsScreen from '@app/settings';

import { modalStack } from '@components/Modals';
import SplashScreenComponent from '@components/Modals/SplashScreen';

import useAssets from '@/lib/assets';
import Gradients from '@/lib/assets/gradients';
import { useAuthToken } from '@/lib/auth';
import fonts from '@/lib/fonts';
import { CheckAuth } from '@/lib/graphql/queries';
import { RootStackParamList } from '@/lib/navigation/types';

import { Colors } from '@/styles';

const Stack = createNativeStackNavigator<RootStackParamList>();

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
		<GestureHandlerRootView style={{ flexGrow: 1 }}>
			<ModalProvider stack={modalStack}>
				<PortalProvider>
					<SplashScreenComponent show={showSplashScreen} />
					<Stack.Navigator
						screenOptions={{
							headerShown: false,
							contentStyle: {
								backgroundColor: Colors.Background,
								flex: 1,
							},
						}}
					>
						<Stack.Screen name='Login' component={LoginScreen} />
						<Stack.Screen name='Main' component={MainScreen} />
						<Stack.Screen name='Scan' component={ScanScreen} />
						<Stack.Screen name='Map' component={MapScreen} />
						<Stack.Screen
							name='Settings'
							component={SettingsScreen}
						/>

						<Stack.Screen name='Add' component={AddScreen} />
						<Stack.Screen name='QRCode' component={QRCodeScreen} />
					</Stack.Navigator>
				</PortalProvider>
			</ModalProvider>
		</GestureHandlerRootView>
	);
};

export default App;
