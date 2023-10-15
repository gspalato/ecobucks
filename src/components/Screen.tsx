import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Animated, {
	FadeIn,
	FadeOut,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import tw from 'twrnc';

import { Defaults as DefaultStyles } from '@/styles';

type ScreenProps = React.PropsWithChildren<{
	style?: StyleProp<ViewStyle>;
}>;

const Component: React.FC<ScreenProps> = (props) => {
	const { children, style } = props;

	const opacity = useSharedValue(0);

	return (
		<Animated.View
			entering={FadeIn}
			exiting={FadeOut}
			style={[DefaultStyles.View, Styles.container, style, { opacity }]}
		>
			{children}
		</Animated.View>
	);
};

export default Component;

const Styles = {
	container: [tw`flex-1`, { backgroundColor: '#f5f5f5' }],
};
