import { Image } from 'expo-image';
import { Animated, Text, View } from 'react-native';
import tw from 'twrnc';

import { getFontSize } from '@/lib/fonts';

import CardGradient1 from '@assets/gradients/gradient1.png';
import CardGradient2 from '@assets/gradients/gradient2.png';
import CardGradient7 from '@assets/gradients/gradient7.png';
import CardGradient12 from '@assets/gradients/gradient12.png';
import CardGradient20 from '@assets/gradients/gradient20.png';

type CreditCardProps = {
	credits: number;
	name: string;
}

const Component: React.FC<CreditCardProps> = (props) => {
	const { credits, name } = props;

	const CardGradientOptions = [
		CardGradient1,
		CardGradient2,
		CardGradient7,
		CardGradient12,
		CardGradient20
	];

	const SelectedGradient = CardGradientOptions[Math.floor(Math.random() * CardGradientOptions.length)]

	return (
		<Animated.View style={Styles.card}>
			<Image
				source={SelectedGradient}
				style={tw`absolute h-full w-full rounded-2xl`}
				contentPosition={{ top: -10 }}
				priority='high'
				transition={750}
			/>
			<Text adjustsFontSizeToFit numberOfLines={2}  style={Styles.text.credit}>${Math.floor(credits) || '0'}</Text>
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
			tw`text-white w-full p-5 `,
			{
				fontSize: getFontSize(40),
				fontFamily: 'Bricolage Grotesque Bold',
			},
		],
	},
	detail: {
		container: [tw`absolute bottom-0 w-full pb-5`],
		name: [
			tw`text-white w-3/4 p-5 pb-2 `,
			{ fontSize: getFontSize(18), fontFamily: 'Syne_700Bold' },
		],
		number: [
			tw`text-white w-full px-5 `,
			{ fontSize: getFontSize(18), fontFamily: 'Inter_400Regular' },
		],
	},
};
