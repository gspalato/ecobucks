import React, { forwardRef, isValidElement, useRef, useState } from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';

import { fontSizes } from '@/lib/fonts';

import { Spacings } from '@/styles';

import BottomSheet, { BottomSheetProps } from '../BottomSheet';

import { SelectItemDefinition } from '.';

type SelectSheetProps = {
	items: SelectItemDefinition[];

	onSelect: (item: SelectItemDefinition | undefined) => void;
} & BottomSheetProps;

const Component: React.FC<SelectSheetProps> = (props, ref) => {
	const { items, onSelect, ...rest } = props;

	return (
		<BottomSheet ref={ref as any} {...rest}>
			<FlatList
				style={{ flex: 1 }}
				data={items}
				renderItem={(info) => (
					<TouchableOpacity
						style={[
							{
								alignItems: 'center',
								borderBottomWidth: 0,
								borderColor: '#00000011',
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'center',
								padding: 4 * Spacings.Unit,
								width: '100%',
							},
							info.index == 0 && {
								marginTop: 4 * Spacings.Unit,
							},
						]}
						onPress={() => {
							onSelect(info.item);
							ref?.current?.close();
						}}
					>
						{info.item.icon &&
							(isValidElement(info.item.icon) ? (
								info.item.icon
							) : (
								<Text
									style={{
										position: 'absolute',
										left: 10 * Spacings.Unit,
										fontSize: fontSizes.xl,
									}}
								>
									{info.item.icon}
								</Text>
							))}
						<Text
							style={{
								fontFamily: 'Inter_400Regular',
								fontSize: fontSizes.xl,
								textAlign: 'center',
							}}
						>
							{info.item.label}
						</Text>
					</TouchableOpacity>
				)}
			/>
		</BottomSheet>
	);
};

export default forwardRef<{}, SelectSheetProps>(Component as any);
