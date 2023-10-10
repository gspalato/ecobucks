import { TouchableOpacity } from 'react-native-gesture-handler';

import { StyleProp, Text, TextStyle, ViewStyle } from 'react-native';

import { getFontSize } from '@/lib/fonts';

import { Colors, Defaults } from '@/styles';

interface IButtonProps {
	onPress?: () => void;
	text: string;
	buttonStyle?: StyleProp<ViewStyle>;
	textStyle?: StyleProp<TextStyle>;
}

const Component: React.FC<IButtonProps> = (props) => {
	const { buttonStyle, onPress, text, textStyle } = props;

	return (
		<TouchableOpacity
			style={[
				{
					alignItems: 'center',
					backgroundColor: Colors.Accent,
					borderRadius: 3.5 * Defaults.Spacing,
					display: 'flex',
					height: 20 * Defaults.Spacing,
					justifyContent: 'center',
					padding: 4 * Defaults.Spacing,
					width: 100 * Defaults.Spacing,
				},
				buttonStyle,
			]}
			onPress={onPress}
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
