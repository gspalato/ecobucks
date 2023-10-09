import { createContext, useContext, useState } from 'react';

const TabContext = createContext({} as any);

export const useTabs = () => useContext(TabContext);
export const TabProvider: React.FC<React.PropsWithChildren> = (props) => {
	const { children } = props;

	const [currentTab, setCurrentTab] = useState<number | null>(null);

	return (
		<TabContext.Provider
			value={{ currentTab: currentTab ?? 0, setCurrentTab }}
		>
			{children}
		</TabContext.Provider>
	);
};
