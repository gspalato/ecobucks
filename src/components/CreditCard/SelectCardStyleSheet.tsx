import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlashList } from '@shopify/flash-list';
import { forwardRef, useEffect, useState } from 'react';

import CardStyles from '@/lib/assets/cardStyles';

import BottomSheet, { BottomSheetProps } from '../BottomSheet';
import CardColorOption from '../CardColorOption';

type SelectCardStyleSheetProps = {
	onStyleSelect: () => void;
} & BottomSheetProps;

const Component: React.FC<SelectCardStyleSheetProps> = forwardRef(
	(props, ref) => {
		const { onStyleSelect, ...rest } = props;

		const [selected, setSelected] = useState<string>('');

		const saveStyle = (style: string) => {
			AsyncStorage.setItem('cardStyle', style);
			setSelected(style);
		};

		useEffect(() => {
			AsyncStorage.getItem('cardStyle', (e, r) => {
				if (e) {
					console.log(e);
					return;
				}

				if (r) setSelected(r);
			});
		}, []);

		return (
			<BottomSheet ref={ref as any} {...rest}>
				<FlashList
					data={Object.keys(CardStyles)}
					estimatedItemSize={232}
					renderItem={(info) => (
						<CardColorOption
							key={info.index}
							image={CardStyles[info.item]}
							index={info.index}
							onPress={() => {
								saveStyle(info.item);
								onStyleSelect();
							}}
							isSelected={info.item == selected}
						/>
					)}
				/>
			</BottomSheet>
		);
	},
);

export default Component;
