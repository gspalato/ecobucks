import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

import { Defaults } from '@/styles';

type TabButtonProps = {
	icon: (focused: boolean) => React.ReactNode;
	color: (focused: boolean) => string;
	name: string;
	focused: boolean;

	onPress: () => void;
};

const Component: React.FC<TabButtonProps> = (props) => {
	const { color, icon, name, onPress, focused } = props;

	return (
		<TouchableOpacity
			hitSlop={50}
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				gap: 1.5 * Defaults.Spacing,
			}}
			onPress={onPress}
		>
			{icon(focused)}
			<Text
				style={[{ fontFamily: 'Syne_700Bold', color: color(focused) }]}
			>
				{name}
			</Text>
		</TouchableOpacity>
	);
};

export default Component;
