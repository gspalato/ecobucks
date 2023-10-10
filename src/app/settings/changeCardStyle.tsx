import { FlatList } from 'react-native-gesture-handler';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import tw from 'twrnc';

import DefaultHeader from '@/components/DefaultHeader';
import SafeView from '@/components/SafeView';

import Gradients from '@/lib/assets/gradients';
import {
	RootStackParamList,
	SettingsStackParamList,
} from '@/lib/navigation/types';

import CardColorOption from './components/CardColorOption';
import { Defaults } from '@/styles';

type Props = CompositeScreenProps<
	NativeStackScreenProps<SettingsStackParamList, 'ChangeCardStyle'>,
	NativeStackScreenProps<RootStackParamList, 'Main'>
>;

const Component: React.FC<Props> = () => {
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
		<SafeView safeHeader style={[Defaults.View, { flex: 1 }]}>
			<DefaultHeader title='Change Card Style' />
			<FlatList
				data={Object.keys(Gradients)}
				maxToRenderPerBatch={3}
				renderItem={(info) => (
					<CardColorOption
						key={info.index}
						image={Gradients[info.item]}
						index={info.index}
						onPress={() => saveGradient(info.item)}
						isSelected={info.item == selected}
					/>
				)}
			/>
		</SafeView>
	);
};

export default Component;
