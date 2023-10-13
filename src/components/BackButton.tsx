import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import {
	OpaqueColorValue,
	StyleProp,
	TouchableOpacity,
	View,
} from 'react-native';
import { ViewStyle } from 'react-native';

type BackButtonProps = {
	color?: string | OpaqueColorValue;
	style?: StyleProp<ViewStyle>;
};

const Component: React.FC<BackButtonProps> = (props) => {
	const { color = '#000000', style } = props;

	const navigation = useNavigation();

	const onPress = () => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		navigation.goBack();
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
