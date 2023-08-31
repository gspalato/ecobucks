import { StyleProp, Text, TextStyle, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import tw from 'twrnc';

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
	button: [tw`rounded-lg bg-[#11da33] p-3`],
	text: [
		tw`text-center text-xl font-bold text-white`,
		{ fontFamily: 'Inter SemiBold' },
	],
};
