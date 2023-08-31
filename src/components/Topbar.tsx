import { View, Text, Pressable } from "react-native";

import { FontAwesome, Ionicons } from "@expo/vector-icons";

import tw from 'twrnc';
import { router } from "expo-router";
import BackButton from "./BackButton";

const Topbar: React.FC = () => {
    return (
        <View style={tw`w-full min-h-12 border-b pb-2 border-b-[#00000011] px-4 flex flex-row items-center justify-between`}>
            <Text style={[tw`text-[#11da33] text-[9] font-bold`, { fontFamily: 'Space Grotesk Bold', fontWeight: 'bold' }]}>ecobucks</Text>
            <View style={tw`flex flex-row gap-4`}>
                <MapButton />
                <ScanButton />
                <BackButton />
            </View>
        </View>
    );
}

export default Topbar;

const MapButton: React.FC = () => {
    const onPress = () => {
        router.push("map");
    }

    return (
        <Pressable onPress={onPress}>
            <View style={tw`p-1 rounded-full`}>
                <FontAwesome name="map-marker" size={24} color="black" />
            </View>
        </Pressable>
    );
}

const ScanButton: React.FC = () => {
    const onPress = () => {
        router.push("scan");
    }

    return (
        <Pressable onPress={onPress}>
            <View style={tw`p-1 rounded-full`}>
                <Ionicons name="scan" size={24} color="black" />
            </View>
        </Pressable>
    );
}