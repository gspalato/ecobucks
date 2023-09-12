import React, { useRef } from 'react';
import {
	Animated,
	Modal,
	Pressable,
	Text,
	useWindowDimensions,
	View,
} from 'react-native';
import tw from 'twrnc';

import Checkmark from '@/components/Checkmark';

import { usePlatform } from '@/lib/platform';
import { getFontSize } from '@/lib/fonts';

type ClaimSuccessModalProps = {
	credits: number;
	visible: boolean;
	onPress: () => void;
	onClose: () => void;
};

const Component: React.FC<ClaimSuccessModalProps> = (props) => {
	const { credits, visible, onClose, onPress } = props;

	const progress = useRef(new Animated.Value(0)).current;

	const dimensions = useWindowDimensions();
	const { SafeAreaStyle } = usePlatform();

	Animated.timing(progress, {
		toValue: 0.8 * dimensions.width,
		duration: 3000,
		useNativeDriver: false,
	}).start(onClose);

	return (
		<Modal
			presentationStyle='fullScreen'
			visible={visible}
			animationType='fade'
			style={tw`m-0 flex-1`}
		>
			<Pressable onPress={onClose} style={tw`flex-1`}>
				<Animated.View style={[Styles.screen, SafeAreaStyle]}>
					<Text
						style={[
							Styles.text,
							tw`mb-7`,
							{ fontFamily: 'Syne_700Bold', fontSize: 50 },
						]}
					>
						Claimed!
					</Text>
					<Checkmark
						animate
						duration={100}
						height={250}
						width={250}
						color='#ffffff'
					/>
					<Text
						style={[
							Styles.text,
							tw`mt-7 flex items-center justify-center`,
							{ fontSize: 60 },
						]}
					>
						+${credits}
					</Text>
					<Animated.View
						style={[
							tw`absolute bottom-10 mx-auto mb-4 h-1.5 w-0 rounded-full bg-[#ffffff]`,
							{ width: progress },
						]}
					/>
				</Animated.View>
			</Pressable>
		</Modal>
	);
};

Component.displayName = 'ClaimSuccessModal';

export default Component;

const Styles = {
	screen: [tw`flex-1 items-center justify-center bg-[#11da33]`],
	text: [
		tw`mx-auto text-center`,
		{ fontSize: getFontSize(45), fontFamily: 'Bricolage Grotesque Bold', color: '#ffffff' },
	],
};
