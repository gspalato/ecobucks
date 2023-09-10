import { StyleProp, View, ViewStyle } from 'react-native';
import tw from 'twrnc';

type SeparatorProps = {
	style?: StyleProp<ViewStyle>;
};

const Component: React.FC<SeparatorProps> = (props) => {
	const { style } = props;

	return <View style={[tw`border-b border-[#0000001a]`, style]} />;
};

export default Component;
