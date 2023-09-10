import { useEffect, useRef, useState } from 'react';
import { Animated, Modal, Pressable, Text, View } from 'react-native';
import tw from 'twrnc';

const Component = () => {
	const [tapped, setTapped] = useState(false);
	const [playedOnce, setPlayedOnce] = useState(false);

	const opacity = useRef(new Animated.Value(1)).current;

	const fadeOut = (callback: () => void) => {
		Animated.timing(opacity, {
			toValue: 0,
			duration: 300,
			useNativeDriver: true,
		}).start(callback);
	};

	// We only want to hide the Splash Screen after it has played at least once
	const handleScreenTap = () => {
		setTapped(true);
	};

	const handleAnimationFinish = () => {
		setPlayedOnce(true);
	};

	useEffect(() => {
		setTimeout(() => fadeOut(handleAnimationFinish), 3000);
	}, []);

	const isModalVisible = !playedOnce && !tapped;

	return (
		<Modal
			presentationStyle='fullScreen'
			visible={isModalVisible}
			animationType='fade'
		>
			<Pressable style={[tw`flex-1`]} onPress={handleScreenTap}>
				<Animated.View style={[Styles.container, { opacity }]}>
					<Text style={Styles.text}>ecobucks</Text>
				</Animated.View>
			</Pressable>
		</Modal>
	);
};

Component.displayName = 'SplashScreen';

export default Component;

const Styles = {
	container: [tw`flex flex-1 items-center justify-center bg-[#11da33]`],
	text: [
		tw`leading-0 text-6xl text-[#ffffff]`,
		{ fontFamily: 'SpaceGrotesk_700Bold' },
	],
};
