import { Ionicons } from '@expo/vector-icons';
import { isValidElement, useRef, useState } from 'react';
import {
	Animated,
	FlatList,
	Modal,
	Pressable,
	StyleProp,
	Text,
	TextStyle,
	View,
	ViewStyle,
} from 'react-native';
import { Swipeable, TouchableOpacity } from 'react-native-gesture-handler';
import tw from 'twrnc';

type SelectItemDefinition = {
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
	const { buttonStyle, placeholder, setItem, textStyle } = props;

	const [_item, _setItem] = useState<SelectItemDefinition | null>(null);
	const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);

	const onPress = () => {
		setIsSelectModalOpen(true);
	};

	return (
		<>
			<TouchableOpacity
				style={[Styles.button, buttonStyle]}
				onPress={onPress}
			>
				<Text style={[Styles.text, textStyle]}>
					{_item?.label || placeholder}
				</Text>
				<Ionicons name='chevron-down' size={20} color='#000000' />
			</TouchableOpacity>
			<Modal
				visible={isSelectModalOpen}
				animationType='fade'
				onRequestClose={() => setIsSelectModalOpen(false)}
				presentationStyle='pageSheet'
				supportedOrientations={['portrait']}
			>
				<Pressable onPress={() => setIsSelectModalOpen(false)}>
					<Animated.View
						style={[tw`flex-1 items-center justify-center`]}
					>
						<View
							style={tw`h-1/2 w-3/4 rounded-3xl bg-[#ffffff] shadow-md`}
						>
							<View style={tw`h-7 rounded-3xl shadow-md`} />
							<FlatList
								data={props.items}
								renderItem={(info) => (
									<TouchableOpacity
										style={Styles.selectItem.container}
										onPress={() => {
											setItem(info.item);
											_setItem(info.item);
											setIsSelectModalOpen(false);
										}}
									>
										{info.item.icon &&
											(isValidElement(info.item.icon) ? (
												info.item.icon
											) : (
												<Text
													style={
														Styles.selectItem.icon
													}
												>
													{info.item.icon}
												</Text>
											))}
										<Text style={Styles.selectItem.text}>
											{info.item.label}
										</Text>
									</TouchableOpacity>
								)}
							/>
						</View>
					</Animated.View>
				</Pressable>
			</Modal>
		</>
	);
};

Component.displayName = 'Select';

export default Component;

const Styles = {
	button: [
		tw`leading-0 w-90 h-13 text-4.25 mx-auto mb-4 flex-row items-center justify-between rounded-lg border border-[#00000022] bg-[#0000011] p-3`,
	],
	text: [tw`text-lg font-bold text-[#000000]`, { fontFamily: 'Inter' }],
	selectItem: {
		container: [
			tw`flex w-full items-center justify-between border-b border-[#00000011] p-2`,
		],
		icon: [tw`bg-[#ff0000] text-xl`],
		text: [tw`text-center text-xl`, { fontFamily: 'Inter' }],
	},
};
