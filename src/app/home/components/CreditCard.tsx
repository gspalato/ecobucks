import { LinearGradient } from 'expo-linear-gradient';
import { DeviceMotion } from 'expo-sensors';
import { Subscription } from 'expo-sensors/build/Pedometer';
import { useEffect, useRef, useState } from 'react';
import {
	Easing,
	StyleProp,
	Text,
	TextStyle,
	View,
	ViewStyle,
} from 'react-native';
import Animated, {
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import tw from 'twrnc';

interface ICreditCardProps {
	credits: number;
}

const Component: React.FC<ICreditCardProps> = (props) => {
	const { credits } = props;

	/*
	const [subscription, setSubscription] = useState<Subscription | null>(null);

	const rotationX = useSharedValue(0);
	const rotationY = useSharedValue(0);

	const animationConfig = {
		duration: 200,
		easing: Easing.bezier(0.5, 0.01, 0, 1),
	};

	const style = useAnimatedStyle(() => {
		const style = {
			transform: [
				{
					rotateX: `${interpolate(
						rotationX.value,
						[-0.5, 0.5],
						[-30, 30],
					)}deg`,
				},
				{
					rotateY: `${interpolate(
						rotationY.value,
						[-0.5, 0.5],
						[-30, 30],
					)}deg`,
				},
			],
		};

		console.log(style);

		return style;
	});

	const _subscribe = () => {
		DeviceMotion.setUpdateInterval(50);
		setSubscription(
			DeviceMotion.addListener((data) => {
				// Beta: -1 -> 1
				let beta = clamp(data.rotation.beta, -0.5, 0.5);

				// Gamma: -3 -> 3
				let gamma = clamp(data.rotation.gamma, -0.5, 0.5);

				rotationX.value = withTiming(beta, animationConfig);
				rotationY.value = withTiming(gamma, animationConfig);
			}),
		);
	};

	const _unsubscribe = () => {
		subscription && subscription.remove();
		setSubscription(null);
	};

	useEffect(() => {
		_subscribe();
		return () => _unsubscribe();
	}, []);
	*/

	return (
		<Animated.View
			id='card_representation'
			style={[
				tw`mx-auto mt-5 flex aspect-video w-[95%] items-center justify-center overflow-hidden rounded-2xl border border-[#00000011] bg-[#f0f0f5]`,
			]}
		>
			<LinearGradient
				colors={['#ebebed', '#ffffff', '#ebebed']}
				style={tw`absolute h-full w-full rounded-2xl`}
				locations={[0.25, 0.5, 0.75]}
				start={{ x: 0, y: 1 }}
				end={{ x: 1, y: 0 }}
			/>
			<Text
				style={[
					{
						fontFamily: 'Space Grotesk Bold',
						fontSize: 140,
					},
					tw`text-black/05 -top-22 absolute mx-auto font-bold`,
				]}
			>
				credit
			</Text>
			<Text
				style={[
					{
						fontFamily: 'Space Grotesk Bold',
						fontSize: 140,
					},
					tw`text-black/05 -bottom-15 absolute mx-auto font-bold`,
				]}
			>
				credit
			</Text>
			<Text
				style={[
					tw`leading-0 text-7xl font-bold text-[#11da33]`,
					{ fontFamily: 'Space Grotesk Bold' },
				]}
			>
				${credits || '0'}
			</Text>
		</Animated.View>
	);
};

export default Component;

const styles = {
	button: [tw`rounded-lg bg-[#11da33] p-3`],
	text: [
		tw`text-white text-center text-xl font-bold`,
		{ fontFamily: 'Inter SemiBold' },
	],
};
