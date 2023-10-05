import {
	OpaqueColorValue,
	StyleProp,
	Text,
	TextStyle,
	ViewStyle,
} from 'react-native';

import { fontSizes } from '@/lib/fonts';
import tw from '@/lib/tailwind';

import BackButton from './BackButton';
import HeaderPadding from './HeaderPadding';

type DefaultHeaderProps = {
	headerStyle?: StyleProp<ViewStyle>;

	backButtonColor?: string | OpaqueColorValue;
	backButtonStyle?: StyleProp<ViewStyle>;

	title: string;
	titleStyle?: StyleProp<TextStyle>;

	showBackButton?: boolean;
} & React.PropsWithChildren;

const Component: React.FC<DefaultHeaderProps> = (props) => {
	const {
		backButtonColor,
		backButtonStyle,
		children,
		headerStyle,
		showBackButton = true,
		title,
		titleStyle,
	} = props;

	return (
		<HeaderPadding style={[tw`justify-center`, headerStyle]}>
			{showBackButton && (
				<BackButton
					style={[tw`pl-2`, backButtonStyle]}
					color={backButtonColor}
				/>
			)}
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
					titleStyle,
				]}
			>
				{title}
			</Text>
			{children}
		</HeaderPadding>
	);
};

export default Component;
