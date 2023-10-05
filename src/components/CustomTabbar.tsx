import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { StyleProp, Text, View, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import tw from 'twrnc';

import TabButton from './TabButton';
import { useTabs } from './Tabs';

type TabbarProps = {
	style?: StyleProp<ViewStyle>;
};

const Component: React.FC<TabbarProps> = (props) => {
	const { style } = props;

	const { currentTab, setCurrentTab } = useTabs();

	return (
		<View style={[Styles.container, style]}>
			<TabButton icon='home-outline' tab='home' name='Home' />
			<TabButton icon='scan' tab='scan' name='Scan' />
			<TabButton icon='map' tab='map' name='Map' />
			<TabButton icon='gift-outline' tab='store' name='Store' />
		</View>
	);
};

export default Component;

const Styles = {
	container: [
		tw`absolute bottom-6 flex h-20 w-full flex-row items-center justify-center gap-12`,
	],
	tabButton: {
		container: [tw`flex items-center justify-center gap-1`],
		icon: [],
		text: [{ fontFamily: 'Syne_700Bold', color: '#11da33' }],
	},
};
