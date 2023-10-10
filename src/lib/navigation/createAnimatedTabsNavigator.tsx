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
import Reanimated, { useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import TabButton from '@/components/TabButton';

import { Defaults } from '@/styles';

import { useTabBarLayout } from '../layout';

type AnimatedTabsNavigationOptions = {
	name: string;
	icon: (
		focused: boolean,
		color: Animated.AnimatedInterpolation<string | number>,
	) => React.ReactNode;

	focusedColor?: string;
	unfocusedColor?: string;
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
			/* Convert scroll offset to route index by dividing by tab width */
			/* When this division gives an integer, it means that the user has scrolled to the next tab */
			/* We will then set the route to that tab */

			const offsetToIndex = value / width;
			if (Number.isInteger(offsetToIndex)) {
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
				extraData={state.key}
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
					<View
						id={'animated_tab_wrapper-' + info.index}
						style={{ height: '100%', width }}
					>
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
							unfocusedColor={
								descriptors[r.key].options.unfocusedColor ??
								'#00000055'
							}
							focusedColor={
								descriptors[r.key].options.focusedColor ??
								'#000000ff'
							}
							name={descriptors[r.key].options.name || r.name}
							focused={r.key === state.routes[state.index].key}
							routeIndex={i}
							scrollX={scrollX}
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
