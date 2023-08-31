import { useLazyQuery } from "@apollo/client";
import { Link, Stack, router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from 'twrnc';

import BackButton from "components/BackButton";
import OptionButton from "./components/OptionButton";
import Topbar from "components/Topbar";

import * as GetEcobucksProfile from "lib/graphql/queries/getEcobucksProfile";

import { useAuthToken } from "lib/auth";

import { Profile } from "types/Profile";

const Screen = () => {
	const [token, setToken] = useState<string | null>(null);
	const [profile, setProfile] = useState<Profile | null>(null);

	const [success, setSuccess] = useState<boolean | null>(null);

	useAuthToken(setToken);

	const [ fetchProfile, { loading, error, data } ] = useLazyQuery(GetEcobucksProfile.Query, {
		onCompleted(data) {
			setProfile(data.ecobucksProfile);
			setSuccess(true);
		},
		onError(e) {
			alert(`Failed to fetch profile.\n${e.message}\n${e.cause}\n${e.graphQLErrors.map(e => e.message)}`);
			setSuccess(false);
		}
	});

	useEffect(() => {
		if (!token) return;

		fetchProfile({
			variables: {
				token
			}
		});
	}, [token]);

	if (!profile)
		return <ActivityIndicator size="large" color="#11da33" style={tw`flex-1`} />;

  	return (
		<>
			<Stack.Screen options={{ }} />
			<SafeAreaView style={{ alignItems: "center" }}>
				<Topbar />
				<View style={tw`justify-start items-start h-full w-full py-4`}>
					<View style={tw`px-4 w-full`}>
					<View id="card_representation" style={tw`aspect-video mt-5 mx-auto w-[95%] shadow-md border overflow-hidden border-[#0000001a] bg-[#f0f0f5] rounded-2xl flex justify-center items-center`}>
						<LinearGradient
							colors={[ "#ebebed", "#ffffff", "#ebebed" ]}
							style={tw`h-full w-full absolute rounded-2xl`}
							locations={[ 0.25, 0.5, 0.75 ]}
							start={{ x: 0, y: 1}}
							end={{ x: 1, y: 0 }}
						/>
						<Text
							style={[
								{ fontFamily: 'Space Grotesk Bold', fontSize: 140 },
								tw`absolute mx-auto text-black/05 font-bold leading-0 -bottom-15`,
							]}
						>
							credit
						</Text>
						<Text style={[tw`text-[#11da33] text-7xl font-bold leading-0`, { fontFamily: 'Space Grotesk Bold' }]}>
							${profile?.credits || "0.00"}
						</Text>
					</View>
					</View>
					{/*
					<FlatList
						data={UserOptions}
						renderItem={
							({ item }) => (
								<OptionButton
									text={item.name}
									buttonStyle={tw`min-w-10 w-35`}
									onPress={() => router.push(item.path)}
								/>
							)
						}
						horizontal
						contentContainerStyle={tw`justify-around gap-2 px-2 w-full mt-5`}
					/>*/}
				</View>
			</SafeAreaView>
		</>
  );
}

export default Screen;

const UserOptions = [
	{
		name: "Scan",
		icon: "qrcode",
		color: "#11da33",
		path: "scan"
	},
	{
		name: "Locations",
		icon: "map-marker-alt",
		color: "#11da33",
		path: "map"
	}
];

const OperatorOptions = [
	{
		name: "Register",
		icon: "user-plus",
		color: "#11da33",
		path: "register"
	}
];