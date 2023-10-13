import {
	GestureHandlerRootView,
	Swipeable,
} from 'react-native-gesture-handler';

import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { Animated } from 'react-native';
import tw from 'twrnc';

import { DisposalField } from '@/app/operator/add';

import Select, { SelectItemDefinition } from '@components/Select';

import Input from '@/components/Input';

import { DisposalType } from '@/types/DisposalClaim';

import { Spacings } from '@/styles';

const disposalOptions: SelectItemDefinition[] = [
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
	onUpdate: React.Dispatch<React.SetStateAction<DisposalField[]>>;
}) => {
	const { index, onDelete, onUpdate } = props;

	const [selected, setSelected] = useState<
		SelectItemDefinition | undefined
	>();

	const onSelect = (item: SelectItemDefinition | undefined) => {
		setSelected(item);

		onUpdate((prev) => {
			const newDisposalFields = [...prev];
			newDisposalFields[index].disposalType = item!.value;
			return newDisposalFields;
		});
	};

	const renderRightActions = (progress: any, dragX: any) => {
		const opacity = dragX.interpolate({
			inputRange: [-100, 0],
			outputRange: [1, 0],
		});

		return (
			<Animated.View
				style={[tw`flex-1 justify-center bg-[#ff0000]`, { opacity }]}
			>
				<Feather
					size={25}
					name='trash-2'
					color={'#000000'}
					style={tw`text-center`}
				/>
			</Animated.View>
		);
	};

	return (
		<Animated.View
			style={{
				height: 40 * Spacings.Unit,
				width: '100%',
				padding: 5 * Spacings.Unit,
			}}
		>
			<Input
				inputMode='decimal'
				style={tw`mx-auto`}
				onChangeText={(text) =>
					onUpdate((prev) => {
						const newDisposalFields = [...prev];
						newDisposalFields[index].weight = Number(text);
						return newDisposalFields;
					})
				}
				placeholder='Weight (grams)'
				placeholderTextColor='#00000055'
			/>
			<Select
				items={disposalOptions}
				selectedItem={selected}
				setItem={onSelect}
				placeholder='Select Disposal Type'
			/>
		</Animated.View>
	);
};

Component.displayName = 'DisposalField';

export default Component;
