import { LinearGradient } from 'expo-linear-gradient';
import { DeviceMotion } from 'expo-sensors';
import { Subscription } from 'expo-sensors/build/Pedometer';
import { useEffect, useRef, useState } from 'react';
import {
	Animated,
	Easing,
	StyleProp,
	Text,
	TextStyle,
	View,
	ViewStyle,
} from 'react-native';
import tw from 'twrnc';

interface ICreditCardProps {
	credits: number;
}

const Component: React.FC<ICreditCardProps> = (props) => {
	const { credits } = props;

	const rotationX = useRef(new Animated.Value(0)).current;
	const rotationY = useRef(new Animated.Value(0)).current;

	const [subscription, setSubscription] = useState<Subscription | null>(null);

	const clamp = (n: number, min: number, max: number): number =>
		Math.max(Math.min(n, max), min);

	const scale = (
		unscaledNum: number,
		minAllowed: number,
		maxAllowed: number,
		min: number,
		max: number,
	) => {
		return (
			((maxAllowed - minAllowed) * (unscaledNum - min)) / (max - min) +
			minAllowed
		);
	};

	const _subscribe = () => {
		DeviceMotion.setUpdateInterval(100);
		setSubscription(
			DeviceMotion.addListener((data) => {
				/*
				// Beta: -1 -> 1
				let beta = clamp(data.rotation.beta, -0.5, 0.5);

				// Gamma: -3 -> 3
				let gamma = clamp(data.rotation.gamma, -0.5, 0.5);

				rotationX.interpolate({
					inputRange: [-0.5, 0.5],
					outputRange: ['-30deg', '30deg'],
				});

				rotationY.interpolate({
					inputRange: [-0.5, 0.5],
					outputRange: ['-30deg', '30deg'],
				});

				console.log(rotationX, rotationY);

				Animated.timing(rotationX, {
					toValue: gamma,
					easing: Easing.inOut(Easing.ease),
					duration: 100,
					useNativeDriver: true,
				}).start();

				Animated.timing(rotationY, {
					toValue: beta,
					easing: Easing.inOut(Easing.ease),
					duration: 100,
					useNativeDriver: true,
				}).start();
				*/
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

	const config = {
		duration: 100,
		easing: Easing.bezier(0.5, 0.01, 0, 1),
	};

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
