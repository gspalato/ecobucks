import { useLazyQuery, useMutation } from '@apollo/client';
import { Link, router, Stack } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import tw from 'twrnc';

import Button from '@components/Button';

import { useAuthToken, useExpireAuthToken, useSetAuthToken } from '@lib/auth';
import { Authenticate } from '@lib/graphql/mutations';

import { AuthenticationPayload } from '@/types/AuthenticationPayload';

const Screen = () => {
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const [submitting, setSubmitting] = useState(false);
	const [success, setSuccess] = useState<boolean | null>(null);

	const [token, setToken] = useState<string | null>(null);

	useExpireAuthToken();
	useAuthToken(setToken);

	const [login, { loading }] = useMutation(Authenticate.Mutation, {
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

	const onPress = () => {
		login();
		setSubmitting(true);
	};

	useEffect(() => {
		if (!token || !success) return;

		if (token && success) router.replace('home');
	}, [token, success]);

	return (
		<View
			style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
		>
			<Stack.Screen options={{}} />
			<Text
				style={[
					tw`pb-10 text-6xl font-bold text-[#11da33]`,
					{ fontFamily: 'Space Grotesk Bold' },
				]}
			>
				ecobucks
			</Text>
			<TextInput
				style={[
					styles.input,
					success === false && tw`border-[#ff0000]`,
				]}
				onChangeText={setUsername}
				editable={!submitting}
				autoCorrect={false}
				autoCapitalize='none'
				placeholder='Username'
				placeholderTextColor='#00000055'
			/>
			<TextInput
				style={[
					styles.input,
					success === false && tw`border-[#ff0000]`,
				]}
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
				textStyle={tw`text-center text-white`}
				onPress={onPress}
			/>
		</View>
	);
};

export default Screen;

const styles = {
	input: [
		tw`leading-0 w-90 h-13 text-4.25 mx-10 mb-4 rounded-lg border border-[#00000011] bg-[#00000011] p-3`,
		{ fontFamily: 'Inter', color: '#000000aa' },
	],
};
