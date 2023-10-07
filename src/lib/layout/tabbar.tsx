import { createContext, useContext, useState } from 'react';

type TabBarContextValue = {
	height: number;
	_setHeight: (height: number) => void;

	width: number;
	_setWidth: (width: number) => void;

	blurIntensity: number;
	setBlurIntensity: (intensity: number) => void;

	blurTint: 'light' | 'dark' | 'default';
	setBlurTint: (tint: 'light' | 'dark' | 'default') => void;
};

const TabBarContext = createContext<TabBarContextValue>({
	height: 0,
	_setHeight: (height: number) => {},

	width: 0,
	_setWidth: (width: number) => {},

	blurIntensity: 20,
	setBlurIntensity: (intensity: number) => {},

	blurTint: 'light',
	setBlurTint: (tint) => {},
});

const TabBarProvider: React.FC<React.PropsWithChildren> = (props) => {
	const { children } = props;

	const [height, _setHeight] = useState(0);
	const [width, _setWidth] = useState(0);

	const [blurIntensity, setBlurIntensity] = useState(20);
	const [blurTint, setBlurTint] = useState<'light' | 'dark' | 'default'>(
		'light',
	);

	return (
		<TabBarContext.Provider
			value={{
				height,
				_setHeight,
				width,
				_setWidth,
				blurIntensity,
				setBlurIntensity,
				blurTint,
				setBlurTint,
			}}
		>
			{children}
		</TabBarContext.Provider>
	);
};

const useTabBarLayout = () => useContext(TabBarContext);

export { TabBarProvider, TabBarContextValue, useTabBarLayout };
