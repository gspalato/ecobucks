import { useLazyQuery, useMutation } from "@apollo/client";
import Button from "components/Button";
import { Link, Stack, router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import tw from 'twrnc';

import { Authenticate } from "lib/graphql/mutations";
import { AuthenticationPayload } from "types/AuthenticationPayload";

const Screen = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [submitting, setSubmitting] = useState(false);
	const [success, setSuccess] = useState<boolean | null>(null);

    const [token, setToken] = useState<string | null>(null);

    const [ login, { loading } ] = useMutation(Authenticate.Mutation, {
        variables: {
            username,
            password
        },
        onCompleted(data) {
            let payload: AuthenticationPayload = data.authenticate;
            let success = payload.successful;

            setSuccess(success);

            if (!success) return;

            setToken(payload.token);
            setSubmitting(false);

            router.push('home');
        },
        onError(e) {
            setSubmitting(false);
            setSuccess(false);
            alert("Failed to login. Try again.");
        },
    });

    const onPress = () => {
        login();
        setSubmitting(true);
    }

    useEffect(() => {

    }, []);

  	return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Stack.Screen options={{ }} />
            <Text style={[tw`text-[#11da33] text-6xl font-bold pb-10`, { fontFamily: 'Space Grotesk Bold' }]}>
                ecobucks
            </Text>
            <TextInput
                style={[styles.input, success === false && tw`border-[#ff0000]`]}
                onChangeText={setUsername}
                value={username}
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Username"
                placeholderTextColor="#00000055"
            />
            <TextInput
                style={[styles.input, success === false && tw`border-[#ff0000]`]}
                onChangeText={setPassword}
                value={password}
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Password"
                placeholderTextColor="#00000055"
                secureTextEntry={true}
            />
            <Button
                text="Login"
                buttonStyle={tw`w-40 bg-[#11da33] border-0 mt-2`}
                textStyle={tw`text-center text-white`}
                onPress={onPress}
            />
        </View>
    );
}

export default Screen;

const styles = {
    input: [
        tw`p-3 bg-[#00000011] leading-0 border rounded-lg border-[#00000011] w-90 h-13 mb-4 mx-10 text-4.25`,
        { fontFamily: 'Inter', color: '#000000aa' },
    ]
}