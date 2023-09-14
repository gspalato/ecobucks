import { StyleProp, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';

import { usePlatform } from '@/lib/platform';

type SafeViewProps = {
	style?: StyleProp<ViewStyle>;
} & React.PropsWithChildren;

const Component: React.FC<SafeViewProps> = (props) => {
	const { children, style } = props;

	const { isAndroid, SafeAreaStyle } = usePlatform();

	return (
		<SafeAreaView style={[SafeAreaStyle, style, isAndroid && tw`pt-0`]}>
			{children}
		</SafeAreaView>
	);
};

export default Component;
