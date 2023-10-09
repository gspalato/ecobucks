import { useEffect, useRef } from 'react';
import { useWindowDimensions, View } from 'react-native';
import { Animated } from 'react-native';

import TabBar from '@/components/Tabs/TabBar';

import { useTabs } from './TabContext';

type TabRoute = {
	name: string;
	icon: (focused: boolean) => React.ReactNode;
	color: (focused: boolean) => string;
	component: React.ReactNode;
};

type TabsPageProps = {
	routes: TabRoute[];
	tab?: number;
};

const Component: React.FC<TabsPageProps> = (props) => {
	const { routes, tab } = props;

	const { width } = useWindowDimensions();

	const { currentTab, setCurrentTab } = useTabs();

	const listRef = useRef<any>();
	const scrollX = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		if (tab) setCurrentTab(tab);
	}, [tab]);

	useEffect(() => {
		let listener = scrollX.addListener(({ value }) => {
			const offsetToIndex = value / width;
			if (Number.isInteger(offsetToIndex)) setCurrentTab(offsetToIndex);
		});

		return () => scrollX.removeListener(listener);
	}, []);

	useEffect(() => {
		listRef?.current?.scrollToOffset({
			offset: currentTab * width,
		});
	}, [currentTab]);

	return (
		<>
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
				data={routes}
				renderItem={(info) => (
					<View style={{ height: '100%', width }}>
						{info.item.component}
					</View>
				)}
			/>
			<View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
				<TabBar routes={routes} />
			</View>
		</>
	);
};

export default Component;
