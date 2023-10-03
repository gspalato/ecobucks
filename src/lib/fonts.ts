import {
	Inter_100Thin,
	Inter_200ExtraLight,
	Inter_300Light,
	Inter_400Regular,
	Inter_500Medium,
	Inter_600SemiBold,
	Inter_700Bold,
	Inter_800ExtraBold,
	Inter_900Black,
} from '@expo-google-fonts/inter';
import {
	RedRose_300Light,
	RedRose_400Regular,
	RedRose_500Medium,
	RedRose_600SemiBold,
	RedRose_700Bold,
} from '@expo-google-fonts/red-rose';
import {
	SpaceGrotesk_300Light,
	SpaceGrotesk_400Regular,
	SpaceGrotesk_500Medium,
	SpaceGrotesk_600SemiBold,
	SpaceGrotesk_700Bold,
} from '@expo-google-fonts/space-grotesk';
import {
	SpaceMono_400Regular,
	SpaceMono_700Bold,
} from '@expo-google-fonts/space-mono';
import {
	Syne_400Regular,
	Syne_500Medium,
	Syne_600SemiBold,
	Syne_700Bold,
	Syne_800ExtraBold,
} from '@expo-google-fonts/syne';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { PixelRatio } from 'react-native';

export default {
	BricolageGrotesque_200ExtraLight: require('../../assets/fonts/BricolageGrotesque-ExtraLight.ttf'),
	BricolageGrotesque_300Light: require('../../assets/fonts/BricolageGrotesque-Light.ttf'),
	BricolageGrotesque_400Regular: require('../../assets/fonts/BricolageGrotesque-Regular.ttf'),
	BricolageGrotesque_500Medium: require('../../assets/fonts/BricolageGrotesque-Medium.ttf'),
	BricolageGrotesque_600SemiBold: require('../../assets/fonts/BricolageGrotesque-SemiBold.ttf'),
	BricolageGrotesque_700Bold: require('../../assets/fonts/BricolageGrotesque-Bold.ttf'),
	BricolageGrotesque_800ExtraBold: require('../../assets/fonts/BricolageGrotesque-ExtraBold.ttf'),

	Inter_100Thin,
	Inter_200ExtraLight,
	Inter_300Light,
	Inter_400Regular,
	Inter_500Medium,
	Inter_600SemiBold,
	Inter_700Bold,
	Inter_800ExtraBold,
	Inter_900Black,

	RedRose_300Light,
	RedRose_400Regular,
	RedRose_500Medium,
	RedRose_600SemiBold,
	RedRose_700Bold,

	SpaceGrotesk_300Light,
	SpaceGrotesk_400Regular,
	SpaceGrotesk_500Medium,
	SpaceGrotesk_600SemiBold,
	SpaceGrotesk_700Bold,

	SpaceMono_400Regular,
	SpaceMono_700Bold,

	Syne_400Regular,
	Syne_500Medium,
	Syne_600SemiBold,
	Syne_700Bold,
	Syne_800ExtraBold,

	...FontAwesome.font,
	...Ionicons.font,
};

const getFontSize = (size: number) => size / PixelRatio.getFontScale();

const fontSizes = {
	title: getFontSize(20),

	xxl: getFontSize(20),
	xl: getFontSize(17),
	lg: getFontSize(15),
};

export { getFontSize, fontSizes };
