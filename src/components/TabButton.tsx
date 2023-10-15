import { Ionicons } from '@expo/vector-icons';
import { useRef } from 'react';
import {
	Animated,
	Text,
	TouchableOpacity,
	useWindowDimensions,
} from 'react-native';

import { getFontSize } from '@/lib/fonts';
import { usePlatform } from '@/lib/platform';

import { Spacings } from '@/styles';

type TabButtonProps = {
	icon: (
		focused: boolean,
		color: Animated.AnimatedInterpolation<string | number> | string,
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
	const { isAndroid } = usePlatform();

	const inputRange =
		routeIndex === 0
			? [0, 0.5]
			: [routeIndex - 0.75, routeIndex, routeIndex + 0.75];

	const outputRange =
		routeIndex === 0
			? [focusedColor, unfocusedColor]
			: [unfocusedColor, focusedColor, unfocusedColor];

	let color = scrollX
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
				gap: 1.5 * Spacings.Unit,
				width: 25 * Spacings.Unit,
				maxWidth: 25 * Spacings.Unit,
			}}
			onPress={onPress}
		>
			{icon(focused, color)}
			<Animated.Text
				style={[
					{
						fontFamily: 'Syne_700Bold',
						fontSize: getFontSize(13),
						color: color,
					},
				]}
			>
				{name}
			</Animated.Text>
		</TouchableOpacity>
	);
};

export default Component;
