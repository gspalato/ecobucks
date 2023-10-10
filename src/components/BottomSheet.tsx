import { PanGestureHandler } from 'react-native-gesture-handler';

import { Portal } from '@gorhom/portal';
import React, { forwardRef, useCallback, useImperativeHandle } from 'react';
import {
	StyleSheet,
	TouchableWithoutFeedback,
	useWindowDimensions,
	View,
} from 'react-native';
import Animated, {
	interpolate,
	StyleProps,
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';

import { Colors } from '@/styles';

export type BottomSheetProps = {
	activeHeight: number;
	dismissDistance?: number;
	backdropStyle?: StyleProps;
	containerStyle?: StyleProps;
} & React.PropsWithChildren;

const Component: React.FC<BottomSheetProps> = (props, ref) => {
	const {
		activeHeight = 100,
		children,
		dismissDistance = 25,
		backdropStyle,
		containerStyle,
	} = props;

	const { height } = useWindowDimensions();
	const newActiveHeight = height - activeHeight;
	const topAnimation = useSharedValue(height);

	const open = useCallback(() => {
		'worklet';
		topAnimation.value = withSpring(newActiveHeight, {
			damping: 100,
			stiffness: 400,
		});
	}, []);

	const close = useCallback(() => {
		'worklet';
		topAnimation.value = withSpring(height, {
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
			[height, newActiveHeight],
			[0, 0.5],
		);
		const display = opacity === 0 ? 'none' : 'flex';
		return {
			opacity,
			display,
		};
	});

	const gestureHandler = useAnimatedGestureHandler({
		onStart: (_, ctx: { [key: string]: any }) => {
			ctx.startY = topAnimation.value;
		},
		onActive: (event, ctx) => {
			if (event.translationY < 0) {
				topAnimation.value = withSpring(newActiveHeight, {
					damping: 100,
					stiffness: 400,
				});
			} else {
				topAnimation.value = withSpring(
					ctx.startY + event.translationY,
					{
						damping: 100,
						stiffness: 400,
					},
				);
			}
		},
		onEnd: (_) => {
			if (topAnimation.value > newActiveHeight + dismissDistance) {
				topAnimation.value = withSpring(height, {
					damping: 100,
					stiffness: 400,
				});
			} else {
				topAnimation.value = withSpring(newActiveHeight, {
					damping: 100,
					stiffness: 400,
				});
			}
		},
	});

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
			<PanGestureHandler onGestureEvent={gestureHandler}>
				<Animated.View
					style={[
						Styles.container,
						animationStyle,
						{
							backgroundColor: Colors.Background,
							height: activeHeight,
							shadowColor: '#000000',
							shadowOffset: {
								width: 0,
								height: -2.5,
							},
							shadowOpacity: 0.1,
						},
						containerStyle,
					]}
				>
					<View style={Styles.lineContainer}>
						<View style={Styles.line} />
					</View>
					{children}
				</Animated.View>
			</PanGestureHandler>
		</Portal>
	);
};

export default forwardRef<{}, BottomSheetProps>(Component as any);

const Styles = StyleSheet.create({
	container: {
		position: 'absolute',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		bottom: 0,
		left: 0,
		right: 0,
	},
	lineContainer: {
		marginVertical: 10,
		alignItems: 'center',
	},
	line: {
		width: 50,
		height: 4,
		backgroundColor: 'black',
		borderRadius: 20,
	},
	backdrop: {
		backgroundColor: '#00000033',
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		display: 'none',
	},
});

/*
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { forwardRef, useCallback, useImperativeHandle } from 'react';
import { useWindowDimensions, View } from 'react-native';
import Animated, {
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from 'react-native-reanimated';

import { Defaults } from '@/styles';

type BottomSheetProps = {
	activeHeight: number;
	show?: boolean;
};

const Component: React.FC<BottomSheetProps> = forwardRef((props, ref) => {
	const { activeHeight = 100, show } = props;

	const { height } = useWindowDimensions();

	const topOffset = useSharedValue(height);

	const backdropAnimation = useAnimatedStyle(() => {
		const opacity = interpolate(
			topOffset.value,
			[height, height - activeHeight],
			[0, 1],
		);

		const display = opacity > 0 ? 'flex' : 'none';

		console.log(opacity);

		return {
			opacity,
			display,
		};
	});

	const animationStyle = useAnimatedStyle(() => {
		return {
			top: topOffset.value,
		};
	});

	const expand = useCallback(() => {
		'worklet';
		topOffset.value = withSpring(height - activeHeight, {
			damping: 100,
			stiffness: 400,
		});
	}, []);

	const collapse = useCallback(() => {
		'worklet';
		topOffset.value = withSpring(height, {
			damping: 100,
			stiffness: 400,
		});
	}, []);

	useImperativeHandle(ref, () => ({
		expand,
		collapse,
	}));

	return (
		<>
			<TouchableWithoutFeedback onPress={collapse}>
				<Animated.View
					style={[
						{
							backgroundColor: '#00000088',
							flexGrow: 1,
							height: '100%',
						},
						backdropAnimation,
					]}
				/>
			</TouchableWithoutFeedback>
			<Animated.View
				style={[
					Defaults.View,
					{
						backgroundColor: '#ff0000',
						display: 'flex',
						borderRadius: 20,
						flexGrow: 1,
						position: 'absolute',
						left: 0,
						top: 100,
						right: 0,
						bottom: 0,
					},
				]}
			>
				<View
					style={{
						alignItems: 'center',
						display: 'flex',
						height: 30,
						justifyContent: 'center',
						width: '100%',
					}}
				>
					<View
						style={{
							backgroundColor: '#000000',
							borderRadius: 30,
							height: 5,
							width: 35,
						}}
					/>
				</View>
			</Animated.View>
		</>
	);
});

export default Component;
*/
