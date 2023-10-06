import { StyleProp, ViewStyle } from 'react-native';
import {
	NativeSafeAreaViewProps,
	SafeAreaView,
} from 'react-native-safe-area-context';
import tw from 'twrnc';

import { usePlatform } from '@/lib/platform';

type SafeViewProps = {
	style?: StyleProp<ViewStyle>;
} & React.PropsWithChildren &
	NativeSafeAreaViewProps;

const Component: React.FC<SafeViewProps> = (props) => {
	const { children, style, ...rest } = props;

	const { isAndroid, SafeAreaStyle } = usePlatform();

	return (
		<SafeAreaView
			{...rest}
			style={[SafeAreaStyle, style, isAndroid && tw`pt-0`]}
		>
			{children}
		</SafeAreaView>
	);
};

export default Component;
