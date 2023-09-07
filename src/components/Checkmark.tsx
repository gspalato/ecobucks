import { useEffect, useRef, useState } from 'react';
import Animated, {
	useAnimatedProps,
	useSharedValue,
	withRepeat,
	withTiming,
} from 'react-native-reanimated';
import Svg, { Path, PathProps, SvgXml } from 'react-native-svg';

type CheckmarkProps = {
	height: number;
	width: number;

	color: string;
	opacity?: number;

	animate?: boolean;
	duration?: number;
};

const Component: React.FC<CheckmarkProps> = (props) => {
	const { animate, color, duration, height, opacity, width } = props;

	const [length, setLength] = useState(0);
	const ref = useRef<any>(null);

	const progress = useSharedValue(0);

	const animatedProps = useAnimatedProps(() => ({
		strokeDashoffset: length * (1 - progress.value),
	}));

	useEffect(() => {
		if (animate) progress.value = withTiming(1, { duration: duration });
	}, []);

	const AnimatedPath = Animated.createAnimatedComponent(Path);

	return (
		<Svg height={height} width={width} viewBox='0 0 448 512'>
			<AnimatedPath
				d='M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z'
				fill={color}
				fillOpacity={opacity}
				ref={ref}
				onLayout={() => setLength(ref.current.getTotalLength())}
				strokeDasharray={length}
				animatedProps={animatedProps}
			/>
		</Svg>
	);
};

export default Component;
