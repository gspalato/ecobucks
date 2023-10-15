import { BlurView } from 'expo-blur';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import tw from 'twrnc';

import { HeaderProvider, useHeaderLayout } from '@/lib/layout/header';
import { usePlatform } from '@/lib/platform';

import { Colors, Spacings } from '@/styles';

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

	const { isAndroid } = usePlatform();
	const paddings = useSafeAreaInsets();

	const { _setHeight, _setWidth } = useHeaderLayout();

	if (isAndroid)
		return (
			<View
				style={[
					Styles.container,
					{
						backgroundColor: Colors.Background,
						paddingTop:
							8 * Spacings.Unit + (safe ? paddings.top : 0),
					},
					style /*isAndroid && { paddingTop: 0 },*/,
				]}
				onLayout={(e) => {
					_setHeight?.(e.nativeEvent.layout.height);
					_setWidth?.(e.nativeEvent.layout.width);
				}}
			>
				{children}
			</View>
		);
	else
		return (
			<BlurView
				blurReductionFactor={100}
				intensity={blurIntensity ?? 20}
				tint={blurTint}
				style={[
					Styles.container,
					{
						paddingTop:
							8 * Spacings.Unit + (safe ? paddings.top : 0),
					},
					style,
				]}
				onLayout={(e) => {
					_setHeight?.(e.nativeEvent.layout.height);
					_setWidth?.(e.nativeEvent.layout.width);
				}}
			>
				{children}
			</BlurView>
		);
};

export default Component;

const Styles = StyleSheet.create({
	container: {
		paddingBottom: 8 * Spacings.Unit,
		paddingHorizontal: 6 * Spacings.Unit,
		paddingTop: 7 * Spacings.Unit,
		minHeight: 35,
		width: '100%',
	},
});
