import { Platform, StyleSheet, ViewStyle } from 'react-native';

export const Colors = {
	Accent: '#11da33',
	Background: Platform.OS === 'ios' ? '#f9f9f9' : '#ffffff',
	Text: '#000000',
};

export const Fonts = {
	Title: 'Syne_700Bold',
	Paragraph: 'Inter_400Regular',
};

export const Spacings = {
	Unit: 2.5,

	Small: 10,
	Medium: 15,
	Large: 20,
	XLarge: 25,
	XXLarge: 30,
	XXXLarge: 35,
};

export const Radius = {
	Small: 5,
	Medium: 10,
	Large: 15,
	XLarge: 20,
	XXLarge: 25,
	XXXLarge: 30,
};

export const Defaults = {
	View: {
		backgroundColor: Colors.Background,
	},
	Text: {
		color: Colors.Text,
	},
};
