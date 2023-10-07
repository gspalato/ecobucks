import { Ionicons } from '@expo/vector-icons';
import { Icon } from '@expo/vector-icons/build/createIconSet';
import { router } from 'expo-router';
import { Router } from 'expo-router/build/types';
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import tw from 'twrnc';

type GetGeneric<Type> = Type extends Icon<infer Options, infer Name>
	? Options
	: never;

type BaseIconButtonProps = {
	path: Parameters<Router['replace']>[0];
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

	return (
		<TouchableOpacity onPress={() => router.replace(path as any)}>
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
