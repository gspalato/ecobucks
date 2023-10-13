import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
	Animated,
	Text,
	TouchableHighlight,
	TouchableOpacity,
	useWindowDimensions,
	View,
} from 'react-native';
import tw from 'twrnc';

import CardStyles from '@/lib/assets/cardStyles';
import { getFontSize } from '@/lib/fonts';

import SelectCardStyleSheet from './SelectCardStyleSheet';
import { Radius, Spacings } from '@/styles';

import PerformantImage from '../PerformantImage';

type CreditCardProps = {
	credits: number;
	name: string;
};

const Component: React.FC<CreditCardProps> = (props) => {
	const { credits, name } = props;

	const [cardStyle, setCardStyle] = useState<string | null>();

	const { height } = useWindowDimensions();

	const selectCardStyleSheetRef = useRef<any>();

	const updateCardStyle = useCallback(() => {
		// Fetch user selected card style.
		AsyncStorage.getItem('cardStyle', (e, r) => {
			if (e) {
				console.log(e);
				AsyncStorage.setItem('cardStyle', 'Gradient20');
				setCardStyle('Gradient20');
			}

			if (r) setCardStyle(r);
		});
	}, []);

	useEffect(updateCardStyle, []);

	const onLongPress = () => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

		selectCardStyleSheetRef?.current?.open();
	};

	return (
		<>
			<TouchableWithoutFeedback onLongPress={onLongPress}>
				<Animated.View style={Styles.card}>
					{!!cardStyle && (
						<PerformantImage
							source={CardStyles[cardStyle!]}
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
					)}
					<Text
						adjustsFontSizeToFit
						numberOfLines={2}
						style={Styles.text.credit}
					>
						${credits.toFixed(2) || '0'}
					</Text>
					<View style={Styles.detail.container}>
						<Text style={Styles.detail.name}>{name}</Text>
						<Text style={Styles.detail.number}>
							•••• •••• •••• ••••
						</Text>
					</View>
				</Animated.View>
			</TouchableWithoutFeedback>
			<SelectCardStyleSheet
				ref={selectCardStyleSheetRef}
				activeHeight={height * 0.5}
				dismissDistance={10}
				onStyleSelect={updateCardStyle}
			/>
		</>
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
