import { Ionicons } from '@expo/vector-icons';
import { Icon } from '@expo/vector-icons/build/createIconSet';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import tw from 'twrnc';

import { Spacings } from '@/styles';

type GetGeneric<Type> = Type extends Icon<infer Options, infer Name>
	? Options
	: never;

type BaseIconButtonProps = {
	path: string;
	style?: StyleProp<ViewStyle>;
};

type NamedIconButtonProps = {
	icon: GetGeneric<typeof Ionicons>;
	color?: string;
	size?: number;
};

type IconButtonProps =
	| BaseIconButtonProps
	| (
			| (BaseIconButtonProps & NamedIconButtonProps)
			| (BaseIconButtonProps & React.PropsWithChildren)
	  );

const Component: React.FC<IconButtonProps> = (props) => {
	const isNamed = 'icon' in props;
	const isChildren = 'children' in props;

	const { path, style } = props;

	const navigation = useNavigation();

	const onPress = () => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		navigation.navigate(path as never);
	};

	return (
		<TouchableOpacity onPress={onPress}>
			<View
				style={[
					{
						backgroundColor: '#0000000d',
						borderColor: '#00000022',
						borderRadius: 20,
						borderWidth: 0.4,
						padding: 2.5 * Spacings.Unit,
					},
					style,
				]}
			>
				{isNamed && (
					<Ionicons
						name={props.icon}
						size={props.size || 24}
						color={props.color || '#000000'}
					/>
				)}
				{isChildren && props.children}
			</View>
		</TouchableOpacity>
	);
};

Component.displayName = 'IconButton';

export default Component;
