import { TouchableOpacity } from 'react-native-gesture-handler';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { Button as NativeButton, Text, View } from 'react-native';
import tw from 'twrnc';

import Button from '@components/Button';
import Input from '@components/Input';
import SafeView from '@components/SafeView';
import Screen from '@components/Screen';

import { useAuth } from '@lib/auth';

import fonts, { getFontSize } from '@/lib/fonts';
import { RootStackParamList } from '@/lib/navigation/types';

import { Spacings } from '@/styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Component: React.FC<Props> = (props) => {
	const { navigation } = props;

	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const [submitting, setSubmitting] = useState(false);
	const [success, setSuccess] = useState<boolean | null>(null);

	const { isLoggedIn, login } = useAuth();

	useEffect(() => {
		if (isLoggedIn) navigation.replace('Main');
	}, [isLoggedIn]);

	const onPress = async () => {
		setSubmitting(true);

		setSuccess(await login(username, password));
		setSubmitting(false);
	};

	return (
		<Screen>
			<View
				style={{
					alignItems: 'center',
					flexGrow: 1,
					justifyContent: 'center',
					gap: 7.5 * Spacings.Unit,
					width: '100%',
				}}
			>
				<Text
					style={{
						fontSize: getFontSize(55),
						fontFamily: 'SpaceGrotesk_700Bold',
						color: '#11da33',
					}}
				>
					ecobucks
				</Text>
				<Input
					style={success === false && { borderColor: '#ff0000' }}
					onChangeText={setUsername}
					editable={!submitting}
					autoCorrect={false}
					autoCapitalize='none'
					placeholder='Username'
					placeholderTextColor='#00000055'
				/>
				<Input
					style={success === false && { borderColor: '#ff0000' }}
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
					buttonStyle={{
						backgroundColor: '#11da33',
						borderWidth: 0,
						width: 60 * Spacings.Unit,
					}}
					textStyle={{ color: '#ffffff', textAlign: 'center' }}
					onPress={onPress}
				/>
			</View>
			<TouchableOpacity
				hitSlop={30}
				style={{
					position: 'absolute',
					bottom: 15 * Spacings.Unit,
					alignSelf: 'center',
				}}
			>
				<Text
					style={{
						fontFamily: 'SpaceGrotesk_400Regular',
						color: '#0A84FF',
					}}
				>
					Are you new? Register now!
				</Text>
			</TouchableOpacity>
		</Screen>
	);
};

export default Component;
