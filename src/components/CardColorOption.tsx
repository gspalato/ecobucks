import { Image } from 'expo-image';
import { TouchableOpacity } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import tw from 'twrnc';

import Checkmark from '@/components/Checkmark';

import { Radius } from '@/styles';

type CardColorOptionsProps = {
	image: any;
	index: number;
	isSelected?: boolean;
	onPress: (image: any) => void;
};

const Component: React.FC<CardColorOptionsProps> = (props) => {
	const { image, index, isSelected, onPress } = props;

	return (
		<TouchableOpacity
			onPress={() => onPress(image)}
			style={[
				tw`mx-auto mb-4 aspect-video w-[90%] rounded-2xl bg-[#00000022]`,
				{ borderRadius: Radius.Large },
			]}
		>
			<Image
				source={image}
				style={{
					aspectRatio: 16 / 9,
					borderRadius: Radius.Large,
					width: '100%',
				}}
				contentPosition={{ top: -10 }}
				priority='high'
				transition={300}
			/>
			{isSelected && (
				<Animated.View
					entering={FadeIn}
					exiting={FadeOut}
					style={{
						aspectRatio: 16 / 9,
						display: 'flex',
						position: 'absolute',
						height: '100%',
						width: '100%',
						alignItems: 'center',
						justifyContent: 'center',
						borderRadius: Radius.Large,
						backgroundColor: '#00000088',
					}}
				>
					<Checkmark
						animate
						duration={100}
						height={25}
						width={25}
						color='#ffffff'
					/>
				</Animated.View>
			)}
		</TouchableOpacity>
	);
};

export default Component;
