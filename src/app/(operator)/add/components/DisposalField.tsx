import { TextInput, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import tw from 'twrnc';

import Select from '@components/Select';

import Input from '@/components/Input';

import { DisposalType } from '@/types/DisposalClaim';

import { DisposalField } from '..';

const disposalOptions = [
	{
		key: 'recyclable',
		icon: '♻️',
		label: 'Recyclable',
		value: DisposalType.RECYCLABLE,
	},
	{
		key: 'battery',
		icon: '🔋',
		label: 'Battery',
		value: DisposalType.BATTERY,
	},
	{ key: 'sponge', icon: '🧽', label: 'Sponge', value: DisposalType.SPONGE },
	{
		key: 'electronic',
		icon: '📱',
		label: 'Electronic',
		value: DisposalType.ELECTRONIC,
	},
];

const Component = (props: {
	index: number;
	onDelete?: () => void;
	update: React.Dispatch<React.SetStateAction<DisposalField[]>>;
}) => {
	const { index, onDelete, update } = props;

	const onSelect = (item: any) => {
		update((prev) => {
			const newDisposalFields = [...prev];
			newDisposalFields[index].disposalType = item.value;
			return newDisposalFields;
		});
	};

	return (
		<Swipeable onSwipeableOpen={onDelete} key={index}>
			<View
				key={index}
				style={tw`min-h-40 mt-4 w-full border-b border-[#00000011] p-5`}
			>
				<Input
					style={tw`mx-auto`}
					onChangeText={(text) =>
						update((prev) => {
							const newDisposalFields = [...prev];
							newDisposalFields[index].weight = Number(text);
							return newDisposalFields;
						})
					}
					placeholder='Weight'
					placeholderTextColor='#00000055'
				/>
				<Select
					items={disposalOptions}
					setItem={onSelect}
					placeholder='Select Disposal Type'
				/>
			</View>
		</Swipeable>
	);
};

Component.displayName = 'DisposalField';

export default Component;
