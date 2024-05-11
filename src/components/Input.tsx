import { TextInput } from 'react-native-gesture-handler';

import React, { ForwardRefExoticComponent } from 'react';

import { getFontSize } from '@/lib/fonts';

import { Spacings } from '@/styles';

type GetGeneric<T> = T extends ForwardRefExoticComponent<infer P> ? P : never;

const Component: React.FC<GetGeneric<TextInput>> = (props) => {
	const { style, ...rest } = props;

	return (
		<TextInput
			style={[
				{
					fontSize: getFontSize(15),
					fontFamily: 'SpaceGrotesk_400Regular',
					color: '#000000',
					height: 20 * Spacings.Unit,
					width: '80%',
					borderRadius: 3 * Spacings.Unit,
					borderWidth: 1,
					borderColor: '#00000022',
					padding: 5 * Spacings.Unit,
				},
				style,
			]}
			{...rest}
		/>
	);
};

Component.displayName = 'Input';

export default Component;
