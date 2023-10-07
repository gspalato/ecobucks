import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Dimensions, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import tw from 'twrnc';

import BackButton from '@/components/BackButton';
import DefaultHeader from '@/components/DefaultHeader';
import Header from '@/components/Header';
import SafeView from '@/components/SafeView';

import Gradients from '@/lib/assets/gradients';
import { fontSizes } from '@/lib/fonts';

import CardColorOption from './components/CardColorOption';

const Screen = () => {
	const [selected, setSelected] = useState<string>('');

	const saveGradient = (gradient: string) => {
		AsyncStorage.setItem('card-gradient', gradient);
		setSelected(gradient);
	};

	useEffect(() => {
		AsyncStorage.getItem('card-gradient', (e, r) => {
			if (e) {
				console.log(e);
				return;
			}

			if (r) setSelected(r);
		});
	}, []);

	return (
		<SafeView safeHeader style={[tw`flex-1`]}>
			<DefaultHeader title='Change Card Color' />
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
