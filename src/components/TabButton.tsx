import { Ionicons } from '@expo/vector-icons';
import { useRef } from 'react';
import {
	Animated,
	Text,
	TouchableOpacity,
	useWindowDimensions,
} from 'react-native';
import {
	AnimatedStyleProp,
	interpolateColor,
	SharedValue,
} from 'react-native-reanimated';
import tw from 'twrnc';

import { getFontSize } from '@/lib/fonts';

import { Defaults } from '@/styles';

type TabButtonProps = {
	icon: (
		focused: boolean,
		color: Animated.AnimatedInterpolation<string | number>,
	) => React.ReactNode;
	name: string;
	focused: boolean;

	focusedColor: string;
	unfocusedColor: string;

	routeIndex: number;
	scrollX: Animated.Value;

	onPress: () => void;
};

const Component: React.FC<TabButtonProps> = (props) => {
	const {
		focused,
		focusedColor,
		unfocusedColor,
		icon,
		name,
		onPress,
		routeIndex,
		scrollX,
	} = props;

	const { width } = useWindowDimensions();

	const inputRange =
		routeIndex === 0
			? [0, 0.5]
			: [routeIndex - 0.5, routeIndex, routeIndex + 0.5];

	const outputRange =
		routeIndex === 0
			? [focusedColor, unfocusedColor]
			: [unfocusedColor, focusedColor, unfocusedColor];

	const interpolatedColor = scrollX
		.interpolate({
			inputRange: [0, width, width * 2],
			outputRange: [0, 1, 2],
		})
		.interpolate({
			inputRange,
			outputRange,
			extrapolate: 'clamp',
		});

	return (
		<TouchableOpacity
			hitSlop={0}
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				gap: 1.5 * Defaults.Spacing,
			}}
			onPress={onPress}
		>
			{icon(focused, interpolatedColor)}
			<Animated.Text
				style={[
					{ fontFamily: 'Syne_700Bold', color: interpolatedColor },
				]}
			>
				{name}
			</Animated.Text>
		</TouchableOpacity>
	);
};

export default Component;