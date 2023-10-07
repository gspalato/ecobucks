import { useFocusEffect } from 'expo-router';
import { StyleProp, ViewStyle } from 'react-native';
import Animated, {
	FadeIn,
	FadeOut,
	SharedTransition,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import tw from 'twrnc';

type ScreenProps = React.PropsWithChildren<{
	style?: StyleProp<ViewStyle>;
	transition?: boolean;
}>;

const Component: React.FC<ScreenProps> = (props) => {
	const { children, style, transition } = props;

	const opacity = useSharedValue(0);

	useFocusEffect(() => {
		if (!transition) return;

		opacity.value = withTiming(1, {
			duration: 150,
		});

		return () => {
			opacity.value = withTiming(0, {
				duration: 150,
			});
		};
	});

	return (
		<Animated.View
			entering={FadeIn}
			exiting={FadeOut}
			style={[Styles.container, style, { opacity }]}
		>
			{children}
		</Animated.View>
	);
};

export default Component;

const Styles = {
	container: [tw`flex-1`, { backgroundColor: '#f5f5f5' }],
};
