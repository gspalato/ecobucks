import {
	NavigationHelpers,
	ParamListBase,
	TabNavigationState,
} from '@react-navigation/native';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

import TabButton from './TabButton';

type TabbarProps = {
	state: TabNavigationState<ParamListBase>;
	descriptors: any /*BottomTabDescriptorMap*/;
	navigation: NavigationHelpers<
		ParamListBase,
		any /*BottomTabNavigationEventMap*/
	>;
};

const CComponent: React.FC<TabbarProps> = ({
	state,
	descriptors,
	navigation,
}: any) => {
	return (
		<View style={Styles.container}>
			{state.routes.map((route: any, index: number) => {
				const { options } = descriptors[route.key];
				const label =
					options.tabBarLabel !== undefined
						? options.tabBarLabel
						: options.title !== undefined
						? options.title
						: route.name;

				const isFocused = state.index === index;

				const onPress = () => {
					const event = navigation.emit({
						type: 'tabPress',
						target: route.key,
						canPreventDefault: true,
					});

					if (!isFocused && !event.defaultPrevented) {
						// The `merge: true` option makes sure that the params inside the tab screen are preserved
						navigation.navigate({ name: route.name, merge: true });
					}
				};

				const onLongPress = () => {
					navigation.emit({
						type: 'tabLongPress',
						target: route.key,
					});
				};

				return (
					<TabButton
						name={label}
						icon=''
						onPress={onPress}
						onLongPress={onLongPress}
						focused={isFocused}
					/>
				);
			})}
		</View>
	);
};

/*
const Component: React.FC<TabbarProps> = (props) => {
	const { style } = props;

	return (
		<View style={[Styles.container, style]}>
			<TabButton icon='home-outline' tab='home' name='Home' />
			<TabButton icon='scan' tab='scan' name='Scan' />
			<TabButton icon='map' tab='map' name='Map' />
			<TabButton icon='gift-outline' tab='store' name='Store' />
		</View>
	);
};
*/

export default CComponent;

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
