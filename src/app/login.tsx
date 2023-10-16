import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import tw from 'twrnc';

import Button from '@components/Button';

import Input from '@/components/Input';

import { useAuth } from '@lib/auth';

import { getFontSize } from '@/lib/fonts';
import { RootStackParamList } from '@/lib/navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Screen: React.FC<Props> = (props) => {
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
		<View
			style={{
				alignItems: 'center',
				flexGrow: 1,
				justifyContent: 'center',
			}}
		>
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
