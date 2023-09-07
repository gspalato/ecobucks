import { ApolloProvider } from '@apollo/client';
import { loadDevMessages, loadErrorMessages } from '@apollo/client/dev';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { registerRootComponent } from 'expo';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { Stack } from 'expo-router/stack';
import React from 'react';
import { useCallback, useEffect, useState } from 'react';

import { AuthProvider } from '@lib/auth';
import client from '@lib/graphql/client';

SplashScreen.preventAutoHideAsync();

loadErrorMessages();
loadDevMessages();

export const unstable_settings = {
	// Ensure any route can link back to `/`
	initialRouteName: 'home',
};

const App: React.FC = () => {
	const [loaded, setLoaded] = useState(false);
	const [fontsLoaded, error] = useFonts({
		'Inter ExtraLight': require('../../assets/fonts/Inter-ExtraLight.ttf'),
		'Inter Light': require('../../assets/fonts/Inter-Light.ttf'),
		'Inter Thin': require('../../assets/fonts/Inter-Thin.ttf'),
		Inter: require('../../assets/fonts/Inter.ttf'),
		'Inter Medium': require('../../assets/fonts/Inter-Medium.ttf'),
		'Inter SemiBold': require('../../assets/fonts/Inter-SemiBold.ttf'),
		'Inter Bold': require('../../assets/fonts/Inter-Bold.ttf'),
		'Inter Extrabold': require('../../assets/fonts/Inter-ExtraBold.ttf'),
		'Inter Black': require('../../assets/fonts/Inter-Black.ttf'),
		'Space Grotesk': require('../../assets/fonts/SpaceGrotesk.ttf'),
		'Space Grotesk Bold': require('../../assets/fonts/SpaceGrotesk-Bold.ttf'),
		...FontAwesome.font,
		...Ionicons.font,
	});

	useEffect(() => {
		if (fontsLoaded) SplashScreen.hideAsync();
	}, [fontsLoaded]);

	if (!fontsLoaded) return;

	return (
		<ApolloProvider client={client}>
			<AuthProvider>
				<Stack screenOptions={{ headerShown: false }} />
			</AuthProvider>
		</ApolloProvider>
	);
};

registerRootComponent(App);

export default App;
