import {
	OpaqueColorValue,
	StyleProp,
	Text,
	TextStyle,
	View,
	ViewStyle,
} from 'react-native';

import { fontSizes } from '@/lib/fonts';
import tw from '@/lib/tailwind';

import BackButton from './BackButton';
import Header from './Header';

type DefaultHeaderProps = {
	headerStyle?: StyleProp<ViewStyle>;

	backButtonColor?: string | OpaqueColorValue;
	backButtonStyle?: StyleProp<ViewStyle>;

	blurIntensity?: number;
	blurTint?: 'light' | 'dark' | 'default';

	containerStyle?: StyleProp<ViewStyle>;

	title: string;
	titleStyle?: StyleProp<TextStyle>;

	showBackButton?: boolean;
} & React.PropsWithChildren;

const Component: React.FC<DefaultHeaderProps> = (props) => {
	const {
		backButtonColor,
		backButtonStyle,
		containerStyle,
		blurIntensity,
		blurTint,
		children,
		headerStyle,
		showBackButton = true,
		title,
		titleStyle,
	} = props;

	return (
		<Header
			blurIntensity={blurIntensity}
			blurTint={blurTint}
			style={[{ justifyContent: 'center' }, headerStyle]}
		>
			<View
				style={[
					{ justifyContent: 'center', minHeight: 35 },
					containerStyle,
				]}
			>
				{showBackButton && (
					<BackButton
						style={[{ paddingLeft: 0 }, backButtonStyle]}
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
			</View>
		</Header>
	);
};

export default Component;
