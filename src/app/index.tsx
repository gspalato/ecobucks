import 'react-native-gesture-handler';

import { ApolloProvider } from '@apollo/client';
import { loadDevMessages, loadErrorMessages } from '@apollo/client/dev';
import { NavigationContainer } from '@react-navigation/native';
import { registerRootComponent } from 'expo';
import * as NavigationBar from 'expo-navigation-bar';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Platform, UIManager } from 'react-native';

import { PerformantImageProvider } from '@/components/PerformantImage';

import { useFoundationClient } from '@lib/api/graphql/client';

import { AuthProvider } from '@/lib/auth';
import { HeaderProvider, TabBarProvider } from '@/lib/layout';

import App from './app';

loadErrorMessages();
loadDevMessages();

const Root = () => {
	useEffect(() => {
		if (Platform.OS != 'android') return;

		if (UIManager.setLayoutAnimationEnabledExperimental)
			UIManager.setLayoutAnimationEnabledExperimental(true);

		NavigationBar.setBackgroundColorAsync('#ffffff');
		NavigationBar.setBehaviorAsync('overlay-swipe');
		NavigationBar.setVisibilityAsync('hidden');
	});

	const client = useFoundationClient();

	return (
		<>
			<StatusBar translucent backgroundColor='transparent' />
			<ApolloProvider client={client}>
				<AuthProvider>
					<PerformantImageProvider>
						<HeaderProvider>
							<TabBarProvider>
								<NavigationContainer>
									<App />
								</NavigationContainer>
							</TabBarProvider>
						</HeaderProvider>
					</PerformantImageProvider>
				</AuthProvider>
			</ApolloProvider>
		</>
	);
};

registerRootComponent(Root);

/*
import { useLazyQuery, useMutation } from '@apollo/client';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import tw from 'twrnc';

import Button from '@components/Button';

import Input from '@/components/Input';

import { useAuthToken } from '@lib/auth';
import { Authenticate } from '@lib/graphql/mutations';

import { getFontSize } from '@/lib/fonts';
import { CheckAuth } from '@/lib/graphql/queries';

import { AuthenticationPayload } from '@/types/AuthenticationPayload';

const Screen: React.FC = () => {
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const [submitting, setSubmitting] = useState(false);
	const [success, setSuccess] = useState<boolean | null>(null);

	const [token, setToken] = useState<string | null>(null);

	useAuthToken(setToken);

	const [login, { loading }] = useMutation(Authenticate.Mutation, {
		fetchPolicy: 'no-cache',
		variables: {
			username,
			password,
		},
		onCompleted(data) {
			let payload: AuthenticationPayload = data.authenticate;
			let success = payload.successful;

			setSuccess(success);

			if (!success) {
				setSubmitting(false);
				return;
			}

			setSubmitting(false);

			SecureStore.setItemAsync('token', payload.token).then(() => {
				setToken(payload.token);
			});
		},
		onError(e) {
			setSubmitting(false);
			setSuccess(false);
			alert(`Failed to login. Try again.`);
		},
	});

	const [check, { loading: loadingCheck }] = useLazyQuery(CheckAuth.Query, {
		fetchPolicy: 'no-cache',
		variables: {
			token,
		},
		onCompleted: (data) => {
			console.log(data);
			if (data.checkAuthentication.successful) {
				router.replace('/(tabs)');
			}
		},
		onError: (e) => {},
	});

	const onPress = () => {
		login();
		setSubmitting(true);
	};

	useEffect(() => {
		SecureStore.getItemAsync('token').then((token) => {
			if (!token) return;

			check({ variables: { token } });
		});
	}, []);

	useEffect(() => {
		if (!token || !success) return;

		if (token && success) router.replace('/(tabs)');
	}, [token, success]);

	return (
		<View style={tw`flex-1 items-center justify-center`}>
			<Text
				style={[
					tw`pb-10  text-[#11da33]`,
					{
						fontSize: getFontSize(55),
						fontFamily: 'SpaceGrotesk_700Bold',
					},
				]}
			>
				ecobucks
			</Text>
			<Input
				style={[success === false && tw`border-[#ff0000]`]}
				onChangeText={setUsername}
				editable={!submitting}
				autoCorrect={false}
				autoCapitalize='none'
				placeholder='Username'
				placeholderTextColor='#00000055'
			/>
			<Input
				style={[success === false && tw`border-[#ff0000]`]}
				onChangeText={setPassword}
				editable={!submitting}
				autoCorrect={false}
				autoCapitalize='none'
				placeholder='Password'
				placeholderTextColor='#00000055'
				secureTextEntry={true}
			/>
			<Button
				text='Login'
				buttonStyle={tw`mt-2 w-40 border-0 bg-[#11da33]`}
				textStyle={tw`text-white text-center`}
				onPress={onPress}
			/>
		</View>
	);
};

export default Screen;
*/
