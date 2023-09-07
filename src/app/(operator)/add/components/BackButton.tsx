import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';

const Component = () => {
	const onPress = () => {
		router.canGoBack() && router.back();
	};

	return (
		<TouchableOpacity onPress={onPress}>
			<View style={[tw`absolute left-2 top-1.5 z-20`]}>
				<Feather size={35} name='chevron-left' color={'#000000'} />
			</View>
		</TouchableOpacity>
	);
};

Component.displayName = 'BackButton';

export default Component;
