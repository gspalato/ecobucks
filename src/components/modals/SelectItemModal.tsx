import React, { isValidElement } from 'react';
import {
	FlatList,
	Text,
	TouchableOpacity,
	useWindowDimensions,
	View,
} from 'react-native';
import tw from 'twrnc';

import { fontSizes } from '@/lib/fonts';

import { SelectItemDefinition } from '../Select';

const Component: React.FC<any> = ({
	modal: { closeModal, getParam, addListener },
}) => {
	const dimensions = useWindowDimensions();
	const modalHeight = dimensions.height / 3;

	const items: SelectItemDefinition[] = getParam('items', []);
	const setItem: React.Dispatch<React.SetStateAction<SelectItemDefinition>> =
		getParam('setItem', () => {});

	return (
		<View
			style={[
				tw`w-full rounded-t-3xl bg-[#ffffff]`,
				Styles.container,
				{ height: modalHeight, width: dimensions.width },
			]}
		>
			<View style={tw`h-7 items-center justify-center rounded-t-3xl`}>
				<View style={tw`h-1 w-7 rounded-full bg-[#00000022]`} />
			</View>
			<FlatList
				style={tw`flex-1`}
				data={items}
				renderItem={(info) => (
					<TouchableOpacity
						style={[
							Styles.selectItem.container,
							info.index == 0 && {
								borderTopWidth: 1,
							},
						]}
						onPress={() => {
							setItem(info.item);
							closeModal();
						}}
					>
						{info.item.icon &&
							(isValidElement(info.item.icon) ? (
								info.item.icon
							) : (
								<Text style={Styles.selectItem.icon}>
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
	);
};

export default Component;

const Styles = {
	modal: [tw`m-0`, { justifyContent: 'flex-start' }],
	container: [tw`h-300 rounded-t-lg`],
	selectItem: {
		container: [
			tw`flex w-full flex-row items-center justify-center border-b border-[#00000011] p-2`,
		],
		icon: [tw`absolute left-5`, { fontSize: fontSizes.xl }],
		text: [
			tw`text-center`,
			{ fontFamily: 'Inter_400Regular', fontSize: fontSizes.xl },
		],
	},
};
