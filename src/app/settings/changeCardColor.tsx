import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Dimensions, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import tw from 'twrnc';

import BackButton from '@/components/BackButton';
import HeaderPadding from '@/components/HeaderPadding';
import SafeView from '@/components/SafeView';

import Gradients from '@/lib/cardGradients';
import { fontSizes } from '@/lib/fonts';

import CardColorOption from './components/CardColorOption';

const Screen = () => {
	const [selected, setSelected] = useState<string>('');

	const saveGradient = (gradient: string) => {
		AsyncStorage.setItem('card-gradient', gradient);
		setSelected(gradient);
	};

	return (
		<SafeView style={[tw`flex-1`]}>
			<HeaderPadding style={tw`justify-center`}>
				<BackButton style={[tw`pl-2`]} />
				<Text
					numberOfLines={1}
					adjustsFontSizeToFit
					style={[
						tw`absolute w-full items-center justify-center text-center text-2xl`,
						{
							fontFamily: 'Syne_700Bold',
							alignSelf: 'center',
							pointerEvents: 'none',
							fontSize: fontSizes.title,
						},
					]}
				>
					Change Card Color
				</Text>
			</HeaderPadding>
			<ScrollView
				style={[tw`flex-1`]}
				contentContainerStyle={[tw`flex items-center justify-center`]}
			>
				{Object.keys(Gradients).map((gradient, i) => (
					<CardColorOption
						key={i}
						image={Gradients[gradient]}
						index={i}
						onPress={() => saveGradient(gradient)}
						isSelected={gradient == selected}
					/>
				))}
			</ScrollView>
		</SafeView>
	);
};

export default Screen;

const Styles = {};
