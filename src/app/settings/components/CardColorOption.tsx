import { Image } from 'expo-image';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import tw from 'twrnc';

import Checkmark from '@/components/Checkmark';

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
			key={`g${index}`}
			style={[
				tw`mx-auto mb-4 aspect-video w-[90%] rounded-2xl bg-[#00000022]`,
			]}
		>
			<Image
				source={image}
				style={tw`aspect-video w-full rounded-2xl`}
				contentPosition={{ top: -10 }}
				priority='high'
				transition={750}
			/>
			<View
				style={
					isSelected && [
						tw`absolute flex aspect-video h-full w-full items-center justify-center rounded-2xl bg-[#00000088]`,
					]
				}
			>
				<Checkmark
					animate
					duration={100}
					height={25}
					width={25}
					color='#ffffff'
				/>
			</View>
		</TouchableOpacity>
	);
};

export default Component;
