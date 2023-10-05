import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import {
	OpaqueColorValue,
	StyleProp,
	TouchableOpacity,
	View,
} from 'react-native';
import { ViewStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

type BackButtonProps = {
	color?: string | OpaqueColorValue;
	style?: StyleProp<ViewStyle>;
};

const Component: React.FC<BackButtonProps> = (props) => {
	const { color, style } = props;

	const onPress = () => {
		router.back();
	};

	return (
		<TouchableOpacity hitSlop={20} onPress={onPress}>
			<View style={style}>
				<Feather size={35} name='chevron-left' color={color} />
			</View>
		</TouchableOpacity>
	);
};

Component.displayName = 'BackButton';

export default Component;
