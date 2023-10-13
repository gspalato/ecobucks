import { Animated, Text, View } from 'react-native';
import tw from 'twrnc';

import { getFontSize } from '@/lib/fonts';

import PerformantImage from './PerformantImage';
import { Radius, Spacings } from '@/styles';

type CreditCardProps = {
	credits: number;
	gradient: any;
	name: string;
};

const Component: React.FC<CreditCardProps> = (props) => {
	const { credits, gradient, name } = props;

	return (
		<Animated.View style={Styles.card}>
			<PerformantImage
				source={gradient}
				style={{
					borderRadius: Radius.Large,
					height: '100%',
					position: 'absolute',
					width: '100%',
				}}
				imageStyle={{ borderRadius: Radius.Large - 1 }}
				contentPosition={{ top: -10 }}
				priority='high'
				transition={250}
			/>
			<Text
				adjustsFontSizeToFit
				numberOfLines={2}
				style={Styles.text.credit}
			>
				${credits.toFixed(2) || '0'}
			</Text>
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
		{
			alignItems: 'start',
			aspectRatio: 16 / 9,
			backgroundColor: '#0002',
			borderColor: '#fff1',
			borderRadius: Radius.Large,
			borderWidth: 1,
			display: 'flex',
			marginHorizontal: 'auto',
			marginTop: 5 * Spacings.Unit,
			overflow: 'hidden',
			width: '100%',
		},
		tw`mx-auto`,
	],
	text: {
		credit: [
			tw`text-white w-full p-5 `,
			{
				fontSize: getFontSize(40),
				fontFamily: 'BricolageGrotesque_700Bold',
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
