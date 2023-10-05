import { Ionicons } from '@expo/vector-icons';
import { isValidElement, useRef, useState } from 'react';
import {
	StyleProp,
	Text,
	TextStyle,
	useWindowDimensions,
	ViewStyle,
} from 'react-native';
import { Swipeable, TouchableOpacity } from 'react-native-gesture-handler';
import { useModal } from 'react-native-modalfy';
import tw from 'twrnc';

import { getFontSize } from '@/lib/fonts';

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
	setItem: (item: SelectItemDefinition) => void;
}

const Component: React.FC<ISelectProps> = (props) => {
	const { buttonStyle, items, placeholder, setItem, textStyle } = props;

	const [selected, setSelected] = useState<SelectItemDefinition | null>(null);

	const dimensions = useWindowDimensions();

	const { openModal } = useModal();

	const onPress = () => {
		openModal('SelectItemModal', {
			items: items,
			setItem: (item: SelectItemDefinition) => {
				setSelected(item);
				setItem(item);
			},
		});
	};

	return (
		<>
			<TouchableOpacity
				style={[Styles.button, buttonStyle]}
				onPress={onPress}
			>
				<Text style={[Styles.text, textStyle]}>
					{selected?.label || placeholder}
				</Text>
				<Ionicons name='chevron-down' size={20} color='#000000' />
			</TouchableOpacity>
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
