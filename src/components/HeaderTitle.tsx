import { Children } from 'react';
import { Text } from 'react-native';
import tw from 'twrnc';

import { fontSizes } from '@/lib/fonts';

type HeaderTitleProps = {
	children: string;
};

const Component: React.FC<HeaderTitleProps> = (props) => {
	const { children } = props;

	return (
		<Text
			numberOfLines={1}
			adjustsFontSizeToFit
			style={[
				tw`absolute w-full items-center justify-center text-center text-2xl`,
				{
					fontFamily: 'Syne_700Bold',
					alignSelf: 'center',
					pointerEvents: 'none',
					fontSize: fontSizes.title,
				},
			]}
		>
			{children}
		</Text>
	);
};

export default Component;
