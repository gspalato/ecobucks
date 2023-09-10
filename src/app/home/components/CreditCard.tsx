import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Animated, Text, View } from 'react-native';
import tw from 'twrnc';

import CardGradient from '@assets/gradients/gradient2.png';
import Grain from '@assets/grain.svg';

interface ICreditCardProps {
	credits: number;
	name: string;
}

const Component: React.FC<ICreditCardProps> = (props) => {
	const { credits, name } = props;

	return (
		<Animated.View style={Styles.card}>
			<Image
				source={CardGradient}
				style={tw`absolute h-full w-full rounded-2xl`}
				contentPosition={{ top: -10 }}
				priority='high'
				transition={500}
			/>
			<Text style={Styles.text.credit}>${credits || '0'}</Text>
			<View style={Styles.detail.container}>
				<Text style={Styles.detail.name}>{name}</Text>
				<Text style={Styles.detail.number}>•••• •••• •••• ••••</Text>
			</View>
		</Animated.View>
	);
};

export default Component;

const Styles = {
	card: [
		tw`mx-auto mt-5 flex aspect-video w-[95%] items-start justify-start overflow-hidden rounded-2xl border border-[#ffffff11] bg-[#00000022]`,
	],
	button: [tw`rounded-lg bg-[#11da33] p-3`],
	text: {
		credit: [
			tw`leading-0 text-white w-1/2 p-5 text-5xl font-bold`,
			{ fontFamily: 'Bricolage Grotesque Bold' },
		],
	},
	detail: {
		container: [tw`absolute bottom-0 w-full pb-5`],
		name: [
			tw`leading-0 text-white w-3/4 p-5 pb-2 text-xl`,
			{ fontFamily: 'Syne_700Bold' },
		],
		number: [
			tw`leading-0 text-white w-full px-5 text-xl`,
			{ fontFamily: 'Inter_400Regular' },
		],
	},
};
