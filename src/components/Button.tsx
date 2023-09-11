import { StyleProp, Text, TextStyle, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import tw from 'twrnc';

import { getFontSize } from '@/lib/fonts';

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
			style={[styles.button, buttonStyle]}
			onPress={onPress}
		>
			<Text style={[styles.text, textStyle]}>{text}</Text>
		</TouchableOpacity>
	);
};

export default Component;

const styles = {
	button: [tw`flex items-center justify-center rounded-lg bg-[#11da33] p-3`],
	text: [
		tw`overflow-visible leading-none text-[#ffffff]`,
		{ fontSize: getFontSize(17), fontFamily: 'Syne_700Bold' },
	],
};
