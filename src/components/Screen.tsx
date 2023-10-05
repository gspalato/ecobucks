import { useFocusEffect } from 'expo-router';
import { StyleProp, ViewStyle } from 'react-native';
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';
import tw from 'twrnc';

type ScreenProps = React.PropsWithChildren<{
	style?: StyleProp<ViewStyle>;
	tab?: boolean;
	transition?: boolean;
}>;

const Component: React.FC<ScreenProps> = (props) => {
	const { children, style, tab, transition } = props;

	const opacity = useSharedValue(0);

	useFocusEffect(() => {
		if (!transition) return;

		opacity.value = withTiming(1, {
			duration: 250,
		});

		return () => {
			opacity.value = withTiming(0, {
				duration: 250,
			});
		};
	});

	return (
		<Animated.View
			sharedTransitionTag={tab ? 'tabscreen' : 'screen'}
			style={[Styles.container, style, { opacity }]}
		>
			{children}
		</Animated.View>
	);
};

export default Component;

const Styles = {
	container: [tw`flex-1`],
};
