import React, { ForwardRefExoticComponent } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import tw from 'twrnc';

import { getFontSize } from '@/lib/fonts';

type GetGeneric<T> = T extends ForwardRefExoticComponent<infer P> ? P : never;

const Component: React.FC<GetGeneric<TextInput>> = (props) => {
	const { style, ...rest } = props;

	return <TextInput style={[Styles.input, style]} {...rest} />;
};

Component.displayName = 'Input';

export default Component;

const Styles = {
	input: [
		tw`w-90 h-13 mx-10 mb-4 rounded-lg border border-[#00000022] p-3`,
		{
			fontSize: getFontSize(15),
			fontFamily: 'Inter_400Regular',
			color: '#000000',
		},
	],
};
