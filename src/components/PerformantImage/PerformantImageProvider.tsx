import { ImageResult } from 'expo-image-manipulator';
import React, { createContext, useState } from 'react';

type PerformantImageProviderProps = {
	children: React.ReactNode;
};

type PerformantImageContext = {
	cacheImage: (
		asset: any,
		height: number,
		width: number,
		result: ImageResult,
	) => void;
	cachedImages: {
		asset: any;
		height: number;
		width: number;
		result: ImageResult;
	}[];
	hasCachedImage: (asset: any, height: number, width: number) => boolean;
	getCachedImage: (
		asset: any,
		height: number,
		width: number,
	) => ImageResult | null;
};

export const PerformantImageContext = createContext<PerformantImageContext>({
	cacheImage: () => {},
	cachedImages: [],
	hasCachedImage: () => false,
	getCachedImage: () => null,
});

export const PerformantImageProvider: React.FC<PerformantImageProviderProps> = (
	props,
) => {
	const { children } = props;

	const [cachedImages, setCachedImages] = useState<
		{ asset: any; height: number; width: number; result: ImageResult }[]
	>([]);

	const hasCachedImage = (asset: any, height: number, width: number) =>
		cachedImages.some(
			(i) =>
				i.asset === asset && i.height === height && i.width === width,
		);

	const getCachedImage = (asset: any, height: number, width: number) =>
		cachedImages.find(
			(i) =>
				i.asset === asset && i.height === height && i.width === width,
		)?.result || null;

	const cacheImage = (
		asset: any,
		height: number,
		width: number,
		result: ImageResult,
	) => {
		setCachedImages((cachedImages) => {
			if (hasCachedImage(asset, height, width)) return cachedImages;

			return hasCachedImage(asset, height, width)
				? cachedImages
				: [...cachedImages, { asset, height, width, result }];
		});
	};

	return (
		<PerformantImageContext.Provider
			value={{ cacheImage, cachedImages, hasCachedImage, getCachedImage }}
		>
			{children}
		</PerformantImageContext.Provider>
	);
};
