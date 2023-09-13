import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StyleProp, TouchableOpacity, View } from 'react-native';
import { ViewStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import tw from 'twrnc';

type BackButtonProps = {
	style?: StyleProp<ViewStyle>;
};

const Component: React.FC<BackButtonProps> = (props) => {
	const { style } = props;

	const onPress = () => {
		router.back();
	};

	return (
		<TouchableOpacity hitSlop={50} onPress={onPress}>
			<View style={style}>
				<Feather size={35} name='chevron-left' color={'#000000'} />
			</View>
		</TouchableOpacity>
	);
};

Component.displayName = 'BackButton';

export default Component;
