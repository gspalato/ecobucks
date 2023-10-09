import {
	createNavigatorFactory,
	DefaultNavigatorOptions,
	ParamListBase,
	TabActions,
	TabNavigationState,
	TabRouter,
	TabRouterOptions,
	useNavigationBuilder,
} from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { Animated, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import TabButton from '@/components/Tabs/TabButton';

import { Defaults } from '@/styles';

import { useTabBarLayout } from '../layout';

type AnimatedTabsNavigationOptions = {
	name: string;
	color: (focused: boolean) => string;
	icon: (focused: boolean) => React.ReactNode;
};

type AnimatedTabsNavigationEventMap = {
	tabPress: {
		data: { isAlreadyFocused: boolean };
		canPreventDefault: true;
	};
};

type AnimatedTabsNavigationConfig = {};

type AnimatedTabsNavigatorProps = DefaultNavigatorOptions<
	ParamListBase,
	TabNavigationState<ParamListBase>,
	AnimatedTabsNavigationOptions,
	AnimatedTabsNavigationEventMap
> &
	TabRouterOptions &
	AnimatedTabsNavigationConfig;

const AnimatedTabsNavigator: React.FC<AnimatedTabsNavigatorProps> = (props) => {
	const { initialRouteName, children, screenOptions } = props;

	const { state, navigation, descriptors, NavigationContent } =
		useNavigationBuilder(TabRouter, {
			children,
			screenOptions,
			initialRouteName,
		});

	const { blurIntensity, blurTint, _setHeight, _setWidth } =
		useTabBarLayout();

	const { width } = useWindowDimensions();
	const paddings = useSafeAreaInsets();

	const listRef = useRef<any>();
	const scrollX = useRef(new Animated.Value(0)).current;

	const getRouteFromIndex = (index: number) => state.routes[index].name;

	useEffect(() => {
		let listener = scrollX.addListener(({ value }) => {
			const offsetToIndex = value / width;
			if (Number.isInteger(offsetToIndex)) {
				console.log(
					'Swiped to tab ' +
						offsetToIndex +
						' ' +
						getRouteFromIndex(offsetToIndex),
				);

				navigation.dispatch({
					...TabActions.jumpTo(getRouteFromIndex(offsetToIndex)),
				});
			}
		});

		return () => scrollX.removeListener(listener);
	}, []);

	useEffect(() => {
		listRef?.current?.scrollToOffset({
			offset: state.index * width,
		});
	}, [state.index]);

	return (
		<NavigationContent>
			<Animated.FlatList
				ref={listRef}
				horizontal
				pagingEnabled
				bounces={false}
				showsHorizontalScrollIndicator={false}
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { x: scrollX } } }],
					{ useNativeDriver: false },
				)}
				data={state.routes}
				renderItem={(info) => (
					<View style={{ height: '100%', width }}>
						{descriptors[info.item.key].render()}
					</View>
				)}
			/>
			<View style={{ position: 'absolute', bottom: 0, width }}>
				<BlurView
					tint='light'
					intensity={90}
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-around',
						alignItems: 'center',
						paddingTop: 4 * Defaults.Spacing,
						paddingBottom: paddings.bottom,
						width: '100%',
					}}
					onLayout={(e) => {
						_setHeight(e.nativeEvent.layout.height);
						_setWidth(e.nativeEvent.layout.width);
					}}
				>
					{state.routes.map((r, i) => (
						<TabButton
							key={r.name}
							icon={descriptors[r.key].options.icon}
							color={descriptors[r.key].options.color}
							name={descriptors[r.key].options.name || r.name}
							focused={r.key === state.routes[state.index].key}
							onPress={() => {
								const event = navigation.emit({
									type: 'tabPress',
									target: r.key,
									data: { blurring: false },
									canPreventDefault: true,
								});

								if (!(event as any).defaultPrevented) {
									navigation.dispatch({
										...TabActions.jumpTo(r.name),
										target: state.key,
									});
								}

								console.log(
									`Pressed tab ${state.index} :: ${r.name}`,
								);
							}}
						/>
					))}
				</BlurView>
			</View>
		</NavigationContent>
	);
};

export const createAnimatedTabsNavigator = createNavigatorFactory(
	AnimatedTabsNavigator,
);
