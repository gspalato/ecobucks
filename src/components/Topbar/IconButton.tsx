import { Ionicons } from '@expo/vector-icons';
import { Icon } from '@expo/vector-icons/build/createIconSet';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';

import { Spacings } from '@/styles';

type GetGeneric<Type> = Type extends Icon<infer Options, infer Name>
	? Options
	: never;

type BaseIconButtonProps = {
	style?: StyleProp<ViewStyle>;
};

type NamedIconButtonProps = {
	icon: GetGeneric<typeof Ionicons>;
	color?: string;
	size?: number;
};

type NavigationIconButtonProps = {
	path: string;
};

type PressOnlyButtonProps = {
	onPress: () => void;
};

type IconButtonProps =
	| BaseIconButtonProps
	| ((
			| (BaseIconButtonProps & NamedIconButtonProps)
			| (BaseIconButtonProps & React.PropsWithChildren)
	  ) &
			(NavigationIconButtonProps | PressOnlyButtonProps));

const Component: React.FC<IconButtonProps> = (props) => {
	const isNamed = 'icon' in props;
	const isChildren = 'children' in props;

	const { style } = props;

	const navigation = useNavigation();

	const onPress = () => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

		if ('path' in props) navigation.navigate(props.path as never);
		else if ('onPress' in props) props.onPress();
	};

	return (
		<TouchableOpacity onPress={onPress}>
			<View
				style={[
					{
						alignItems: 'center',
						aspectRatio: 1,
						backgroundColor: '#0000000d',
						borderRadius: 100,
						display: 'flex',
						height: '100%',
						justifyContent: 'center',
						padding: 2 * Spacings.Unit,
					},
					style,
				]}
			>
				{isNamed && (
					<Ionicons
						name={props.icon}
						size={props.size || 22}
						color={props.color || '#000000'}
						style={{
							alignItems: 'center',
							display: 'flex',
							justifyContent: 'center',
						}}
					/>
				)}
				{isChildren && props.children}
			</View>
		</TouchableOpacity>
	);
};

Component.displayName = 'IconButton';

export default Component;
