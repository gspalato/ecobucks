import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

type TabButtonProps = {
	icon: string;
	name: string;
	focused: boolean;

	onPress: () => void;
	onLongPress: () => void;
};

const Component: React.FC<TabButtonProps> = (props) => {
	const { icon, name, onPress, onLongPress, focused } = props;

	const selectedColor = '#000000ff';
	const unselectedColor = '#00000044';

	return (
		<TouchableOpacity
			hitSlop={50}
			style={Styles.tabButton.container}
			onPress={onPress}
			onLongPress={onLongPress}
		>
			<Ionicons name={icon} size={25} color={unselectedColor} />
			<Text
				style={[
					Styles.tabButton.text,
					{
						color: unselectedColor,
					},
				]}
			>
				{name}
			</Text>
		</TouchableOpacity>
	);
};

export default Component;

const Styles = {
	tabButton: {
		container: [tw`flex items-center justify-center gap-1`],
		icon: [],
		text: [{ fontFamily: 'Syne_700Bold', color: '#11da33' }],
	},
};
