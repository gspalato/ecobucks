import { Ionicons } from '@expo/vector-icons';
import { Icon } from '@expo/vector-icons/build/createIconSet';
import { useNavigation } from '@react-navigation/native';
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import tw from 'twrnc';

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

	return (
		<TouchableOpacity onPress={() => navigation.navigate(path as never)}>
			<View style={[tw`p-1`, style]}>
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
