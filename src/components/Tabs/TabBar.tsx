import { BlurView } from 'expo-blur';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import TabButton from './TabButton';
import { useTabs } from './TabContext';
import { Defaults } from '@/styles';

type TabBarProps = {
	routes: {
		name: string;
		icon: (focused: boolean) => React.ReactNode;
		color: (focused: boolean) => string;
		component: React.ReactNode;
	}[];
};

const Component: React.FC<TabBarProps> = (props) => {
	const { routes } = props;

	const paddings = useSafeAreaInsets();

	const { currentTab, setCurrentTab } = useTabs();

	return (
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
		>
			{routes.map((r, i) => (
				<TabButton
					icon={r.icon}
					color={r.color}
					name={r.name}
					focused={currentTab == i}
					onPress={() => setCurrentTab(i)}
				/>
			))}
		</BlurView>
	);
};

export default Component;
