import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StyleProp, Text, View, ViewStyle } from 'react-native';
import tw from 'twrnc';

import IconButton from './IconButton';

type ModernTopbarProps = {
	name: string;
	isOperator?: boolean;
	containerStyle?: StyleProp<ViewStyle>;
};

const Component: React.FC<ModernTopbarProps> = (props) => {
	const { containerStyle, isOperator, name } = props;

	return (
		<View style={[Styles.container, containerStyle]}>
			<View style={Styles.greetings.container}>
				<Text style={Styles.greetings.text.greeting}>Hi,</Text>
				<Text
					numberOfLines={1}
					ellipsizeMode='tail'
					style={Styles.greetings.text.name}
				>
					{name}!
				</Text>
			</View>
			<View style={Styles.buttons.container}>
				<IconButton path='/map/' icon='map' />
				<IconButton
					path='/scan/'
					icon='scan'
					style={!isOperator && tw`pr-0`}
				/>
				{isOperator && (
					<>
						<View style={tw`my-1 border-l border-[#00000011]`} />
						<IconButton path='/add/' icon='add' style={tw`px-0`} />
					</>
				)}
			</View>
		</View>
	);
};

Component.displayName = 'Topbar';

export default Component;

const Styles = {
	container: [tw`w-full flex-row items-center justify-between gap-2`],
	greetings: {
		container: [tw`flex flex-1 flex-row gap-2`],
		text: {
			greeting: [
				tw`text-black/80 text-center text-2xl`,
				{ fontFamily: 'Syne_600SemiBold' },
			],
			name: [
				tw`overflow-hidden text-center text-2xl text-[#11da33]`,
				{ fontFamily: 'Syne_700Bold' },
			],
		},
	},
	buttons: {
		container: [tw`flex-row gap-2`],
	},
};
