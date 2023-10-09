import { Swipeable, TouchableOpacity } from 'react-native-gesture-handler';

import { Ionicons } from '@expo/vector-icons';
import { isValidElement, useRef, useState } from 'react';
import {
	StyleProp,
	Text,
	TextStyle,
	useWindowDimensions,
	ViewStyle,
} from 'react-native';
import { useModal } from 'react-native-modalfy';
import tw from 'twrnc';

import { getFontSize } from '@/lib/fonts';

import SelectSheet from './SelectSheet';

export type SelectItemDefinition = {
	key: string;
	icon?: string | JSX.Element;
	label: string;
	value: any;
};

interface ISelectProps {
	placeholder: string;
	buttonStyle?: StyleProp<ViewStyle>;
	textStyle?: StyleProp<TextStyle>;

	items: SelectItemDefinition[];
	selectedItem: SelectItemDefinition | undefined;
	setItem: (
		item: SelectItemDefinition | undefined,
	) => void | React.Dispatch<
		React.SetStateAction<SelectItemDefinition | undefined>
	>;
}

const Component: React.FC<ISelectProps> = (props) => {
	const {
		buttonStyle,
		items,
		placeholder,
		selectedItem,
		setItem,
		textStyle,
	} = props;

	const [selected, setSelected] = useState<
		SelectItemDefinition | undefined
	>();

	const selectSheetRef = useRef<any>();

	const { height } = useWindowDimensions();

	const onPress = () => {
		selectSheetRef?.current?.open();
	};

	return (
		<>
			<TouchableOpacity
				style={[Styles.button, buttonStyle]}
				onPress={onPress}
			>
				<Text style={[Styles.text, textStyle]}>
					{selectedItem?.label || placeholder}
				</Text>
				<Ionicons name='chevron-down' size={20} color='#000000' />
			</TouchableOpacity>
			<SelectSheet
				items={items}
				onSelect={(item) => setItem(item) && setSelected(item)}
				ref={selectSheetRef}
				activeHeight={height * 0.5}
			/>
		</>
	);
};

Component.displayName = 'Select';

export default Component;

const Styles = {
	button: [
		tw`w-90 h-13 mx-auto mb-4 flex-row items-center justify-between rounded-lg border border-[#00000022] bg-[#0000011] p-3`,
	],
	text: [
		tw`text-[#000000]`,
		{ fontFamily: 'Inter_400Regular', fontSize: getFontSize(15) },
	],
	modal: [tw`m-0`, { justifyContent: 'flex-start' }],
	container: [tw`h-300 rounded-t-lg`],
	selectItem: {
		container: [
			tw`flex w-full flex-row items-center justify-center border-b border-[#00000011] p-2`,
		],
		icon: [tw`absolute left-5`, { fontSize: getFontSize(20) }],
		text: [
			tw`text-center`,
			{ fontFamily: 'Inter_400Regular', fontSize: getFontSize(17) },
		],
	},
};
