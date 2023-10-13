import { useMemo } from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import tw from 'twrnc';

import PerformantImage from '@components/PerformantImage';

import { getFontSize } from '@/lib/fonts';

import IconButton from './IconButton';
import { Colors, Spacings } from '@/styles';

type ModernTopbarProps = {
	name: string;
	isOperator?: boolean;
	containerStyle?: StyleProp<ViewStyle>;
};

const Component: React.FC<ModernTopbarProps> = (props) => {
	const { containerStyle, isOperator, name } = props;

	const timeOfDay = useMemo(() => {
		const hours = new Date().getHours();

		if (hours >= 5 && hours < 12) return 'morning';
		else if (hours >= 12 && hours < 17) return 'afternoon';
		else if (hours >= 17 || (hours >= 0 && hours < 5)) return 'evening';
	}, []);

	return (
		<View style={[Styles.container, containerStyle]}>
			<View style={Styles.userContainer}>
				<PerformantImage
					source='https://i.ibb.co/jZMGJsk/resonance.jpg'
					style={{ width: 'auto' }}
					imageStyle={{
						aspectRatio: 1,
						borderRadius: 100,
						height: 20,
						width: 20,
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
						<IconButton path='Add' icon='add' style={tw`px-0`} />
					</>
				)}
				{/*
				<IconButton
					path='Settings'
					icon='settings-outline'
					style={tw`pr-0`}
				/>
				*/}
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
		width: '100%',
	},
	userContainer: {
		display: 'flex',
		flexDirection: 'row',
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
