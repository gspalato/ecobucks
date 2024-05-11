import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useMemo } from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import tw from 'twrnc';

import { getFontSize } from '@/lib/fonts';
import { useRelativeTime } from '@/lib/utils';

import Avatar from './Avatar';
import IconButton from './IconButton';
import { Colors, Spacings } from '@/styles';

type ModernTopbarProps = {
	containerStyle?: StyleProp<ViewStyle>;
	isOperator?: boolean;
	name: string;
};

const Component: React.FC<ModernTopbarProps> = (props) => {
	const { containerStyle, isOperator, name } = props;

	const timeOfDay = useRelativeTime();

	return (
		<View style={[Styles.container, containerStyle]}>
			<View style={Styles.userContainer}>
				<Avatar
					source=''
					style={{
						aspectRatio: 1,
						height: '100%',
						backgroundColor: '#00000033',
					}}
					containerStyle={{
						aspectRatio: 1,
						height: '100%',
					}}
					imageStyle={{
						aspectRatio: 1,
						borderRadius: 100,
						height: '100%',
					}}
				/>
				<View style={Styles.greetingsContainer}>
					<Text style={Styles.greeting}>Good {timeOfDay},</Text>
					<Text
						numberOfLines={1}
						ellipsizeMode='tail'
						style={Styles.name}
					>
						{name}!
					</Text>
				</View>
			</View>
			<View style={Styles.buttonsContainer}>
				<IconButton path='Scan' icon='scan' />
				<IconButton path='Map' icon='map-outline' />

				{isOperator && (
					<>
						<View style={tw`my-1 border-l border-[#00000011]`} />
						<IconButton path='Add'>
							<MaterialIcons
								name='add'
								color='#000000'
								size={22}
								style={{
									aspectRatio: 1,
									alignItems: 'center',
									display: 'flex',
									justifyContent: 'center',
									width: 'auto',
								}}
							/>
						</IconButton>
					</>
				)}
			</View>
		</View>
	);
};

Component.displayName = 'Topbar';

export default Component;

const Styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		flexDirection: 'row',
		gap: 16 * Spacings.Unit,
		justifyContent: 'space-between',
		height: 15 * Spacings.Unit,
		width: '100%',
	},
	userContainer: {
		display: 'flex',
		flexDirection: 'row',
		height: '100%',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		gap: 4 * Spacings.Unit,
		flexGrow: 1,
	},
	greetingsContainer: {
		display: 'flex',
		flexDirection: 'column',
		gap: 1 * Spacings.Unit,
	},
	greeting: {
		color: '#000000',
		fontSize: getFontSize(14),
		fontFamily: 'Syne_500Medium',
		textAlign: 'left',
	},
	name: {
		color: Colors.Accent,
		display: 'flex',
		flexGrow: 1,
		fontSize: getFontSize(16),
		fontFamily: 'Syne_700Bold',
		overflow: 'hidden',
		textAlign: 'left',
	},
	buttonsContainer: {
		alignSelf: 'flex-end',
		flexDirection: 'row',
		gap: 4 * Spacings.Unit,
	},
});
