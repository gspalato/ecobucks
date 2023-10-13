import { TouchableOpacity } from 'react-native-gesture-handler';

import * as Haptics from 'expo-haptics';
import { StyleProp, Text, TextStyle, ViewStyle } from 'react-native';

import { getFontSize } from '@/lib/fonts';

import { Colors, Spacings } from '@/styles';

interface IButtonProps {
	onPress?: () => void;
	text: string;
	buttonStyle?: StyleProp<ViewStyle>;
	textStyle?: StyleProp<TextStyle>;
}

const Component: React.FC<IButtonProps> = (props) => {
	const { buttonStyle, onPress, text, textStyle } = props;

	const onButtonPress = () => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

		onPress?.();
	};

	return (
		<TouchableOpacity
			style={[
				{
					alignItems: 'center',
					backgroundColor: Colors.Accent,
					borderRadius: 3.5 * Spacings.Unit,
					display: 'flex',
					height: 20 * Spacings.Unit,
					justifyContent: 'center',
					padding: 4 * Spacings.Unit,
					width: 100 * Spacings.Unit,
				},
				buttonStyle,
			]}
			onPress={onButtonPress}
		>
			<Text
				style={[
					{
						color: '#ffffff',
						fontSize: getFontSize(17),
						fontFamily: 'Syne_700Bold',
						overflow: 'visible',
					},
					textStyle,
				]}
			>
				{text}
			</Text>
		</TouchableOpacity>
	);
};

export default Component;
