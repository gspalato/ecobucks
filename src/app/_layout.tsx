import { ApolloProvider } from "@apollo/client";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { SplashScreen, router } from "expo-router";
import { Stack } from "expo-router/stack";
import client from "lib/graphql/client";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
loadErrorMessages();
loadDevMessages();

export default function Layout() {
    const [loaded, error] = useFonts({
        "Inter": require('../../assets/fonts/Inter.ttf'),
        "Inter Bold": require('../../assets/fonts/Inter-Bold.ttf'),
        "Inter Extrabold": require('../../assets/fonts/Inter-ExtraBold.ttf'),
        "Inter Black": require('../../assets/fonts/Inter-Black.ttf'),
        "Space Grotesk": require('../../assets/fonts/SpaceGrotesk.ttf'),
        "Space Grotesk Bold": require('../../assets/fonts/SpaceGrotesk-Bold.ttf'),
        ...FontAwesome.font,
        ...Ionicons.font
    });
    
    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);
    
    useEffect(() => {
        if (!loaded)
            return;

        SplashScreen.hideAsync();
    }, [loaded]);
    
    if (!loaded)
        return null;


    return (
        <ApolloProvider client={client}>
            <Stack initialRouteName="login" screenOptions={{ headerShown: false }} />
        </ApolloProvider>
    );
};

