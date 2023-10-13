import AsyncStorage from '@react-native-async-storage/async-storage';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlashList } from '@shopify/flash-list';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

import CardColorOption from '@components/CardColorOption';

import DefaultHeader from '@/components/DefaultHeader';
import SafeView from '@/components/SafeView';

import Gradients from '@/lib/assets/cardStyles';
import { useHeaderLayout, useTabBarLayout } from '@/lib/layout';
import {
	RootStackParamList,
	SettingsStackParamList,
} from '@/lib/navigation/types';

import { Defaults } from '@/styles';

type Props = CompositeScreenProps<
	NativeStackScreenProps<SettingsStackParamList, 'ChangeCardStyle'>,
	NativeStackScreenProps<RootStackParamList, 'Main'>
>;

const Component: React.FC<Props> = () => {
	const [selected, setSelected] = useState<string>('');

	const { height: headerHeight } = useHeaderLayout();
	const { height: tabBarHeight } = useTabBarLayout();

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
		<>
			<View style={[Defaults.View, { flex: 1 }]}>
				<FlashList
					contentContainerStyle={{
						paddingTop: headerHeight + 10,
						paddingBottom: tabBarHeight + 10,
					}}
					data={Object.keys(Gradients)}
					estimatedItemSize={232}
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
			</View>
			<View style={{ flexGrow: 1, position: 'absolute', width: '100%' }}>
				<DefaultHeader title='Card Style' blurIntensity={90} />
			</View>
		</>
	);
};

export default Component;
