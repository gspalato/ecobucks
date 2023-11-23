import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { PortalProvider } from '@gorhom/portal';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
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

import FoundationClient from '@/lib/api/client';
import useAssets from '@/lib/assets';
import CardStyles from '@/lib/assets/cardStyles';
import { useAuth } from '@/lib/auth';
import fonts from '@/lib/fonts';
import { RootStackParamList } from '@/lib/navigation/types';

import { Colors } from '@/styles';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
	const [showSplashScreen, setShowSplashScreen] = useState(true);

	const { loaded: assetsLoaded, ...Assets } = useAssets();
	const [fontsLoaded, error] = useFonts(fonts);

	const { isLoggedIn } = useAuth();

	useEffect(() => {
		if (!error) return;

		console.log(error);
	}, [error]);

	useEffect(() => {
		Object.values(CardStyles).forEach((g) => {
			Assets.preload(g);
		});

		Assets.wait();
	}, []);

	useEffect(() => {
		if (assetsLoaded && fontsLoaded) {
			setShowSplashScreen(false);
		}
	}, [assetsLoaded, fontsLoaded]);

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
						{isLoggedIn ? (
							<>
								<Stack.Screen
									name='Main'
									component={MainScreen}
								/>
								<Stack.Screen
									name='Scan'
									component={ScanScreen}
								/>
								<Stack.Screen
									name='Map'
									component={MapScreen}
								/>
								<Stack.Screen
									name='Settings'
									component={SettingsScreen}
								/>

								<Stack.Screen
									name='Add'
									component={AddScreen}
								/>
								<Stack.Screen
									name='QRCode'
									component={QRCodeScreen}
								/>
							</>
						) : (
							<Stack.Screen
								name='Login'
								component={LoginScreen}
							/>
						)}
					</Stack.Navigator>
				</PortalProvider>
			</ModalProvider>
		</GestureHandlerRootView>
	);
};

export default App;
