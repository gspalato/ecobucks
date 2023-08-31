import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, View } from 'react-native';
import tw from 'twrnc';

const Component = () => {
	const onPress = () => {
		router.back();
	};

	return (
		<Pressable onPress={onPress}>
			<View
				style={tw`z-5 absolute left-3 top-3 border bg-transparent p-1`}
			>
				<Feather icon='chevron-left' size={24} color='black' />
			</View>
		</Pressable>
	);
};

Component.displayName = 'BackButton';

export default Component;
