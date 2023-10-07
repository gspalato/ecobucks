import { createContext, useContext, useState } from 'react';

type HeaderContextValue = {
	height: number;
	_setHeight: (height: number) => void;

	width: number;
	_setWidth: (width: number) => void;

	blurIntensity: number;
	setBlurIntensity: (intensity: number) => void;

	blurTint: 'light' | 'dark' | 'default';
	setBlurTint: (tint: 'light' | 'dark' | 'default') => void;
};

const HeaderContext = createContext<HeaderContextValue>({} as any);

const HeaderProvider: React.FC<React.PropsWithChildren> = (props) => {
	const { children } = props;

	const [height, _setHeight] = useState(0);
	const [width, _setWidth] = useState(0);

	const [blurIntensity, setBlurIntensity] = useState(20);
	const [blurTint, setBlurTint] = useState<'light' | 'dark' | 'default'>(
		'light',
	);

	return (
		<HeaderContext.Provider
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
		</HeaderContext.Provider>
	);
};

const useHeaderLayout = () => useContext(HeaderContext);

export { HeaderProvider, HeaderContextValue, useHeaderLayout };
