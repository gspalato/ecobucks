import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';

import { getFontSize } from '@/lib/fonts';
import { TabBarProvider, useTabBarLayout } from '@/lib/layout';

const Component = () => {
	const activeColor = '#000000cc';
	const inactiveColor = '#00000077';

	const getColor = (selected: boolean) =>
		selected ? activeColor : inactiveColor;

	const { blurIntensity, blurTint, _setHeight, _setWidth } =
		useTabBarLayout();

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarStyle: Styles.tabBar as any,
				tabBarBackground: () => (
					<BlurBackground
						intensity={blurIntensity}
						tint={blurTint}
						_setHeight={_setHeight}
						_setWidth={_setWidth}
					/>
				),
				tabBarActiveTintColor: activeColor,
				tabBarInactiveTintColor: inactiveColor,
				tabBarLabelStyle: [
					{
						fontFamily: 'Syne_700Bold',
						fontSize: getFontSize(12),
					},
				],
			}}
			safeAreaInsets={{ left: 30, right: 30 }}
		>
			<Tabs.Screen
				name='index'
				options={{
					title: 'Home',
					tabBarIcon: ({ focused, size }) => (
						<MaterialCommunityIcons
							name={focused ? 'home' : 'home-outline'}
							color={getColor(focused)}
							size={size}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name='(store)'
				options={{
					title: 'Store',
					tabBarBackground: () => (
						<BlurBackground
							intensity={90}
							tint='light'
							_setHeight={_setHeight}
							_setWidth={_setWidth}
						/>
					),
					tabBarIcon: ({ focused, size }) => (
						<MaterialCommunityIcons
							name={focused ? 'store' : 'store-outline'}
							color={getColor(focused)}
							size={size}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name='custom'
				options={{
					title: 'Test',
					tabBarBackground: () => (
						<BlurBackground
							intensity={90}
							tint='light'
							_setHeight={_setHeight}
							_setWidth={_setWidth}
						/>
					),
					tabBarStyle: { display: 'none' },
				}}
			/>
			<Tabs.Screen
				name='_routes'
				options={{
					href: null,
				}}
			/>
		</Tabs>
	);
};

export default Component;

const Styles = {
	tabBar: [
		{
			position: 'absolute',
			borderTopWidth: 0,
			marginBottom: 0,
			paddingHorizontal: 25,
		},
	],
};

const BlurBackground: React.FC<{
	intensity: number;
	tint: 'light' | 'dark' | 'default';
	[key: string]: any;
}> = (props) => {
	const { intensity, tint, ...rest } = props;

	return (
		<BlurView
			tint={tint}
			intensity={intensity ?? 20}
			style={StyleSheet.absoluteFill}
			onLayout={(e) => {
				rest?._setHeight?.(e.nativeEvent.layout.height);
				rest?._setWidth?.(e.nativeEvent.layout.width);
			}}
		/>
	);
};
