import { Feather } from '@expo/vector-icons';
import { BlurView } from '@react-native-community/blur';
import { Animated, TextInput, View } from 'react-native';
import {
	GestureHandlerRootView,
	Swipeable,
} from 'react-native-gesture-handler';
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
		<GestureHandlerRootView>
			<Swipeable
				key={index}
				onSwipeableOpen={onDelete}
				containerStyle={tw`w-full flex-row justify-end`}
				childrenContainerStyle={tw`min-h-40 mt-4 w-full border-b border-[#00000011] p-5`}
				renderRightActions={renderRightActions}
				useNativeAnimations={false}
			>
				<Input
					inputMode='decimal'
					style={tw`mx-auto`}
					onChangeText={(text) =>
						update((prev) => {
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
					setItem={onSelect}
					placeholder='Select Disposal Type'
				/>
			</Swipeable>
		</GestureHandlerRootView>
	);
};

Component.displayName = 'DisposalField';

export default Component;
