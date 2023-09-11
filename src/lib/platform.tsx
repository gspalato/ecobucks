import { Platform, StatusBar } from 'react-native';

const usePlatform = () => {
	const os = Platform.OS;

	const isAndroid = os === 'android';
	const isIOS = os === 'ios';
	const isOther = !isAndroid && !isIOS;

	return {
		os,
		isAndroid,
		isIOS,
		isOther,
		SafeAreaStyle: [
			isAndroid && [
				{
					paddingTop: StatusBar.currentHeight ?? 0,
					paddingBottom: StatusBar.currentHeight ?? 0,
				},
			],
		],
	};
};

export { usePlatform };
