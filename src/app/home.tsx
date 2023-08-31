import { Link, Stack } from "expo-router";
import { useState } from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from 'twrnc';

import BackButton from "components/BackButton";
import Topbar from "components/Topbar";

import { Profile } from "types/Profile";

const Screen = () => {
	const [profile, setProfile] = useState<Profile | null>(null);

  	return (
		<SafeAreaView style={{ alignItems: "center" }}>
			<Stack.Screen options={{ }} />
			<Topbar />
			<View>
				<Text style={[tw`text-4xl pt-10`, { fontFamily: 'Inter Extrabold' }]}>Welcome back, user!</Text>
				<Text style={[tw`text-3xl pt-5 text-center`, { fontFamily: 'Space Grotesk Bold' }]}>You got: e$125</Text>
			</View>
		</SafeAreaView>
  );
}

export default Screen;