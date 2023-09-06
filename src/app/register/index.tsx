import { Feather, Ionicons } from '@expo/vector-icons';
import { SelectItem } from '@gluestack-ui/themed';
import { router, Slot } from 'expo-router';
import { useMemo, useRef, useState } from 'react';
import {
	Animated,
	Pressable,
	Text,
	TouchableOpacity,
	useWindowDimensions,
	View,
} from 'react-native';
import { Picker } from 'react-native-actions-sheet-picker';
import { SelectList } from 'react-native-dropdown-select-list';
import { FlatList, Swipeable, TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';

import Select from '@/components/Select';

import { DisposalType } from '@/types/DisposalClaim';

type DisposalField = {
	_id: number;
	weight?: number;
	disposalType?: DisposalType;
};

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

const Screen: React.FC = () => {
	const [disposalSearch, setDisposalSearch] = useState('');
	const [disposalFields, setDisposalFields] = useState<DisposalField[]>([
		{ _id: 0, weight: undefined, disposalType: undefined },
	]);

	const scrollX = useRef(new Animated.Value(0)).current;
	const { width: windowWidth } = useWindowDimensions();

	const addNewDisposalField = () => {
		setDisposalFields((prev) => [
			...prev,
			{ _id: prev.length, weight: undefined, disposalType: undefined },
		]);
	};

	const removeDisposalFieldByIndex = (index: number) => {
		setDisposalFields((prev) => {
			const newDisposalFields = [...prev];
			newDisposalFields.splice(index, 1);
			return newDisposalFields;
		});
	};

	const removeDisposalFieldById = (id: number) => {
		setDisposalFields((prev) => prev.filter((item) => item._id !== id));
	};

	return (
		<SafeAreaView style={tw`flex-1`}>
			<View
				style={[
					tw`min-h-12 flex w-full flex-row border-b border-[#00000011]`,
				]}
			>
				<BackButton />
				<Text
					style={[
						tw`my-auto w-full text-center text-2xl font-bold`,
						{ fontFamily: 'Inter Bold' },
					]}
				>
					Register Disposal
				</Text>
			</View>
			<View style={[tw`flex-1`]}>
				<FlatList
					data={disposalFields}
					extraData={disposalFields.length}
					renderItem={({ item, index }) => (
						<DisposalField
							index={index}
							onDelete={() => removeDisposalFieldByIndex(index)}
							update={setDisposalFields}
						/>
					)}
					keyExtractor={(item) => item._id.toString()}
				/>
				<TouchableOpacity onPress={addNewDisposalField}>
					<View style={styles.addButton}>
						<Feather size={24} name='plus' color={'#000000'} />
					</View>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default Screen;

const DisposalField = (props: {
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
				style={tw`min-h-40 mt-5 w-full border-b border-[#00000011] p-5`}
			>
				<TextInput
					style={styles.input}
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

const SwipeActions = (
	progress: Animated.AnimatedInterpolation<'view'>,
	dragAnimatedValue: Animated.AnimatedInterpolation<'view'>,
) => {
	const opacity = dragAnimatedValue.interpolate({
		inputRange: [-150, 0],
		outputRange: [1, 0],
		extrapolate: 'clamp',
	});
	return (
		<View style={styles.swipeActions.swipedRow}>
			<View style={styles.swipeActions.swipedConfirmationContainer}>
				<Text style={styles.swipeActions.deleteConfirmationText}>
					Are you sure?
				</Text>
			</View>
			<Animated.View
				style={[styles.swipeActions.deleteButton, { opacity }]}
			>
				<Pressable>
					<Text style={styles.swipeActions.deleteButtonText}>
						Delete
					</Text>
				</Pressable>
			</Animated.View>
		</View>
	);
};

const BackButton = () => {
	const onPress = () => {
		router.push('home');
	};

	return (
		<Pressable onPress={onPress}>
			<View style={[tw`absolute left-2 top-1.5 z-20`]}>
				<Feather size={35} name='chevron-left' color={'#000000'} />
			</View>
		</Pressable>
	);
};

const styles = {
	input: [
		tw`leading-0 w-90 h-13 text-4.25 mx-auto mb-4 rounded-lg border border-[#00000011] bg-[#00000011] p-3`,
		{ fontFamily: 'Inter', color: '#000000aa' },
	],
	addButton: [
		tw`w-90 h-13 text-4.25 z-10 mx-auto items-center justify-center rounded-lg p-3 text-center shadow-md`,
	],
	swipeActions: {
		container: [tw`min-h-300 flex-1`],
		row: [tw`min-h-50 m-20 flex-1 flex-row items-center bg-[#efefef] pl-5`],
		swipedRow: [
			tw`min-h-50 m-20 flex-1 flex-row items-center bg-[#818181] pl-5`,
		],
		swipedConfirmationContainer: [tw`flex-1`],
		deleteConfirmationText: [tw`font-bold text-[#fcfcfc]`],
		deleteButton: [
			tw`h-full flex-1 flex-row items-center justify-center bg-[#b60000]`,
		],
		deleteButtonText: [tw`p-3 font-bold text-[#fcfcfc]`],
	},
};
