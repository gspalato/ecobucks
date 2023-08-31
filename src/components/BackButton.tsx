import { router } from "expo-router";
import { Pressable, View } from "react-native"
import { FontAwesome5, Feather } from "@expo/vector-icons";
import tw from 'twrnc';

const Component = () => {
    const onPress = () => {
        router.back();
    }

    return (
        <Pressable onPress={onPress}>
            <View style={tw`p-1 border`}>
                <Feather icon='chevron-left' size={24} color="black" />
            </View>
        </Pressable>
    )
}

Component.displayName = "BackButton";

export default Component;