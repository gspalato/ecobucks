import { Portal } from '@gorhom/portal';
import { BlurView } from 'expo-blur';
import React, {
	forwardRef,
	useCallback,
	useImperativeHandle,
	useMemo,
	useState,
} from 'react';
import {
	Dimensions,
	StyleProp,
	StyleSheet,
	TouchableWithoutFeedback,
	ViewStyle,
} from 'react-native';
import Animated, {
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';

import { usePlatform } from '@/lib/platform';

import { Colors } from '@/styles';
import { Spacings } from '@/styles';

type EmptyDialogProps = {
	backdropStyle?: StyleProp<ViewStyle>;
	blurryBackground?: boolean;
	containerStyle?: StyleProp<ViewStyle>;
} & React.PropsWithChildren;

const Component: React.FC<EmptyDialogProps> = (props, ref) => {
	const {
		backdropStyle,
		blurryBackground = true,
		children,
		containerStyle,
	} = props;

	const [dialogHeight, setDialogHeight] = useState<number>(0);

	const { isAndroid } = usePlatform();

	const height = Dimensions.get('screen').height;
	const hiddenHeight = height + dialogHeight;

	const topAnimation = useSharedValue(hiddenHeight);

	const open = useCallback(() => {
		'worklet';
		topAnimation.value = withSpring(0, {
			damping: 100,
			stiffness: 400,
		});
	}, []);

	const close = useCallback(() => {
		'worklet';
		topAnimation.value = withSpring(hiddenHeight, {
			damping: 100,
			stiffness: 400,
		});
	}, []);

	useImperativeHandle(
		ref,
		() => ({
			open,
			close,
		}),
		[open, close],
	);

	const animationStyle = useAnimatedStyle(() => {
		const top = topAnimation.value;
		return {
			top,
		};
	});

	const backdropAnimation = useAnimatedStyle(() => {
		const opacity = interpolate(
			topAnimation.value,
			[hiddenHeight, 0],
			[0, 0.5],
		);
		const display = opacity === 0 ? 'none' : 'flex';
		return {
			opacity,
			display,
		};
	});

	const MemoizedContainer = useMemo(
		() =>
			blurryBackground && !isAndroid
				? Animated.createAnimatedComponent(BlurView)
				: Animated.View,
		[blurryBackground],
	);

	return (
		<Portal>
			<TouchableWithoutFeedback
				onPress={() => {
					close();
				}}
			>
				<Animated.View
					style={[Styles.backdrop, backdropAnimation, backdropStyle]}
				/>
			</TouchableWithoutFeedback>
			<Animated.View
				style={[
					StyleSheet.absoluteFillObject,
					animationStyle,
					{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					},
				]}
				pointerEvents='none'
			>
				<BlurView
					tint='light'
					intensity={90}
					blurReductionFactor={100}
					onLayout={(e) => {
						setDialogHeight(e.nativeEvent.layout.height);
					}}
					style={[
						Styles.container,
						{
							backgroundColor: Colors.Background,
							shadowColor: '#000000',
							shadowOffset: {
								width: 0,
								height: 0,
							},
							shadowOpacity: 0.1,
						},
						containerStyle,
					]}
				>
					{children}
				</BlurView>
			</Animated.View>
		</Portal>
	);
};

export default forwardRef<{}, EmptyDialogProps>(Component as any);

const Styles = StyleSheet.create({
	backdrop: {
		backgroundColor: '#00000033',
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		display: 'none',
	},
	container: {
		display: 'flex',
		borderRadius: 15,
		height: 75 * Spacings.Unit,
		width: 100 * Spacings.Unit,
	},
});
