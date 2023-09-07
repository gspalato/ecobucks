import { BlurView } from '@react-native-community/blur';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Modal, Text, useWindowDimensions, View } from 'react-native';
import { Dimensions } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';

import Button from '@/components/Button';
import Checkmark from '@/components/Checkmark';

const Screen = () => {
	const { credits } = useLocalSearchParams();

	const [isVisible, setVisible] = useState(true);

	if (!credits || typeof credits !== 'string') return;

	const opacity = useRef(new Animated.Value(0)).current;
	const progress = useRef(new Animated.Value(0)).current;

	const dimensions = useWindowDimensions();

	Animated.timing(opacity, {
		toValue: 1,
		duration: 200,
		useNativeDriver: true,
	}).start();

	Animated.timing(progress, {
		toValue: 0.8 * dimensions.width,
		duration: 5000,
		useNativeDriver: false,
	}).start(({ finished }) => {
		router.replace('/home/');
	});

	return (
		<Modal animationType='fade' transparent visible={isVisible}>
			<Animated.View style={[Styles.screen, { opacity }]}>
				<Checkmark
					animate
					duration={100}
					height={250}
					width={250}
					color='#ffffff'
				/>
				{/*
				<Text style={[Styles.text, tw`mt-10`]}>
					Successfully claimed
				</Text>
                */}
				<Text
					style={[
						Styles.text,
						tw`mt-7 flex items-center justify-center`,
						{ fontSize: 60 },
					]}
				>
					+${credits}
				</Text>
				{/*<Text style={[Styles.text, tw`mt-2`]}>credits!</Text>*/}
				<Animated.View
					style={[
						tw`absolute bottom-10 mx-auto mb-4 h-2 w-0 rounded-full bg-[#ffffff]`,
						{ width: progress },
					]}
				/>
			</Animated.View>
		</Modal>
	);
};

export default Screen;

const Styles = {
	screen: [tw`flex-1 items-center justify-center bg-[#11da33]`],
	text: [
		tw`leading-0 mx-auto text-center text-3xl`,
		{ fontFamily: 'Inter Bold', color: '#ffffff' },
	],
};
