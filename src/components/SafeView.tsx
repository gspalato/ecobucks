import { StyleProp, ViewStyle } from 'react-native';
import {
	NativeSafeAreaViewProps,
	SafeAreaView,
} from 'react-native-safe-area-context';
import tw from 'twrnc';

import { usePlatform } from '@/lib/platform';

type SafeViewProps = {
	safeHeader?: boolean;
	style?: StyleProp<ViewStyle>;
} & React.PropsWithChildren &
	NativeSafeAreaViewProps;

const Component: React.FC<SafeViewProps> = (props) => {
	const { children, safeHeader = true, style, ...rest } = props;

	const { isAndroid, SafeAreaStyle } = usePlatform();

	return (
		<SafeAreaView
			{...rest}
			edges={safeHeader ? ['bottom'] : ['top', 'bottom']}
			style={[SafeAreaStyle, style, isAndroid && tw`pt-0`]}
		>
			{children}
		</SafeAreaView>
	);
};

export default Component;
