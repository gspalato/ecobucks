import { BlurView } from 'expo-blur';
import { StyleProp, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import tw from 'twrnc';

import { HeaderProvider, useHeader } from '@/lib/layout/header';

type HeaderProps = {
	blurIntensity?: number;
	blurTint?: 'light' | 'dark' | 'default';
	safe?: boolean;
	style?: StyleProp<ViewStyle>;
} & React.PropsWithChildren;

const Component: React.FC<HeaderProps> = (props) => {
	const {
		blurIntensity,
		blurTint = 'light',
		children,
		safe = true,
		style,
	} = props;

	const paddings = useSafeAreaInsets();

	const { _setHeight, _setWidth } = useHeader();

	return (
		<HeaderProvider>
			<BlurView
				intensity={blurIntensity ?? 20}
				tint={blurTint}
				style={[
					Styles.container,
					{
						width: '100%',
						paddingTop: 20 + (safe ? paddings.top : 0),
						paddingBottom: 15,
						marginBottom: 5,
					},
					style /*isAndroid && { paddingTop: 0 },*/,
				]}
				onLayout={(e) => {
					_setHeight?.(e.nativeEvent.layout.height);
					_setWidth?.(e.nativeEvent.layout.width);
				}}
			>
				{children}
			</BlurView>
		</HeaderProvider>
	);
};

export default Component;

const Styles = {
	container: [tw`mb-4 w-full px-4 pb-3 pt-7`],
};