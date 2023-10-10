import { RectButton } from 'react-native-gesture-handler';
import { Swipeable } from 'react-native-gesture-handler';

import { makeUniqueId } from '@apollo/client/utilities';
import React, { useRef } from 'react';
import {
	Animated,
	I18nManager,
	LayoutAnimation,
	StyleProp,
	StyleSheet,
	Text,
	View,
	ViewStyle,
} from 'react-native';

type DisposalFieldSwipeableRowProps = {
	containerStyle?: StyleProp<ViewStyle>;
	rightButtons: {
		backgroundColor: string;
		text: string;
		onPress: () => void;
		width?: number;
	}[];
} & React.PropsWithChildren;

const SwipeableRow: React.FC<DisposalFieldSwipeableRowProps> = (props) => {
	const { children, containerStyle, rightButtons } = props;

	const swipeable = useRef<any>();

	const close = () => {
		swipeable?.current?.close();
	};

	const renderRightAction = (
		text: string,
		color: string,
		x: number,
		onPress: () => void,
		progress: Animated.AnimatedInterpolation<number>,
	) => {
		const trans = progress.interpolate({
			inputRange: [0, 1],
			outputRange: [x, 0],
		});

		const onPressHandler = () => {
			close();

			LayoutAnimation.configureNext(
				LayoutAnimation.Presets.easeInEaseOut,
			);

			onPress();
		};

		return (
			<Animated.View
				key={makeUniqueId('rra')}
				style={{ flex: 1, transform: [{ translateX: trans }] }}
			>
				<RectButton
					style={[styles.rightAction, { backgroundColor: color }]}
					onPress={onPressHandler}
				>
					<Text style={styles.actionText}>{text}</Text>
				</RectButton>
			</Animated.View>
		);
	};

	const renderRightActions = (
		progress: Animated.AnimatedInterpolation<number>,
		_dragAnimatedValue: Animated.AnimatedInterpolation<number>,
	) => (
		<View
			style={{
				width: 192,
				flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
			}}
		>
			{rightButtons.map((v, i) =>
				renderRightAction(
					v.text,
					v.backgroundColor,
					v.width ?? 192,
					v.onPress,
					progress,
				),
			)}
		</View>
	);

	return (
		<Swipeable
			ref={swipeable}
			friction={2}
			enableTrackpadTwoFingerGesture
			rightThreshold={40}
			renderRightActions={renderRightActions}
			containerStyle={containerStyle}
		>
			{children}
		</Swipeable>
	);
};

export default SwipeableRow;

const styles = StyleSheet.create({
	leftAction: {
		flex: 1,
		backgroundColor: '#497AFC',
		justifyContent: 'center',
	},
	actionText: {
		color: 'white',
		fontSize: 16,
		backgroundColor: 'transparent',
		padding: 10,
	},
	rightAction: {
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center',
	},
});
