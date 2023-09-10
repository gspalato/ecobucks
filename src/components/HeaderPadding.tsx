import { StyleProp, View, ViewStyle } from 'react-native';
import tw from 'twrnc';

type HeaderPaddingProps = {
	style?: StyleProp<ViewStyle>;
} & React.PropsWithChildren;

const Component: React.FC<HeaderPaddingProps> = (props) => {
	const { children, style } = props;

	return (
		<View
			style={[
				Styles.container,
				/*isAndroid && { paddingTop: 0 },*/ style,
			]}
		>
			{children}
		</View>
	);
};

export default Component;

const Styles = {
	container: [tw`w-full px-4 py-7`],
};
