import { ApolloProvider } from '@apollo/client';
import { loadDevMessages, loadErrorMessages } from '@apollo/client/dev';
import { registerRootComponent } from 'expo';
import { useFonts } from 'expo-font';
import * as NavigationBar from 'expo-navigation-bar';
import { SplashScreen } from 'expo-router';
import { Stack } from 'expo-router/stack';
import React from 'react';
import { useEffect, useState } from 'react';
import { Platform, StatusBar } from 'react-native';
import { ModalProvider } from 'react-native-modalfy';

import { modalStack } from '@/components/modals';
import SplashScreenComponent from '@/components/modals/SplashScreen';

import { AuthProvider } from '@lib/auth';
import client from '@lib/graphql/client';

import fonts from '@/lib/fonts';

SplashScreen.preventAutoHideAsync();

loadErrorMessages();
loadDevMessages();

export const unstable_settings = {
	// Ensure any route can link back to `/`
	initialRouteName: 'home',
};

const App: React.FC = () => {
	const [loaded, setLoaded] = useState(false);
	const [fontsLoaded, error] = useFonts(fonts);

	useEffect(() => {
		if (Platform.OS != 'android') return;

		NavigationBar.setBackgroundColorAsync('#fff');
		NavigationBar.setVisibilityAsync('hidden');
	}, []);

	useEffect(() => {
		if (!error) return;

		console.log(error);
	}, [error]);

	useEffect(() => {
		if (fontsLoaded) SplashScreen.hideAsync();
	}, [fontsLoaded]);

	if (!fontsLoaded) return;

	return (
		<>
			<StatusBar translucent backgroundColor='transparent' />
			<ApolloProvider client={client}>
				<AuthProvider>
					<ModalProvider stack={modalStack}>
						<SplashScreenComponent />
						<Stack screenOptions={{ headerShown: false }} />
					</ModalProvider>
				</AuthProvider>
			</ApolloProvider>
		</>
	);
};

registerRootComponent(App);

export default App;
