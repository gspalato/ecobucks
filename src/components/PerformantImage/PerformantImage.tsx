import { Asset } from 'expo-asset';
import { Image, ImageProps, ImageSource, ImageStyle } from 'expo-image';
import {
	ImageResult,
	manipulateAsync,
	SaveFormat,
} from 'expo-image-manipulator';
import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import {
	PixelRatio,
	StyleProp,
	StyleSheet,
	View,
	ViewStyle,
} from 'react-native';
import Animated from 'react-native-reanimated';

import { PerformantImageContext } from './PerformantImageProvider';

export type PerformantImageProps = {
	containerStyle?: StyleProp<ViewStyle>;
	imageStyle?: StyleProp<ImageStyle>;
	source: string | number | null | undefined;
} & ImageProps;

const Component: React.FC<PerformantImageProps> = forwardRef((props, ref) => {
	const {
		containerStyle,
		contentFit,
		contentPosition,
		imageStyle,
		source,
		style,
		transition = 100,
		...rest
	} = props;

	const [containerHeight, setContainerHeight] = useState(0);
	const [containerWidth, setContainerWidth] = useState(0);

	const [image, setImage] = useState<ImageResult | null>(null);

	const { cacheImage, hasCachedImage, getCachedImage } = React.useContext(
		PerformantImageContext,
	);

	const downscaleToContainer = useCallback(
		(asset: Asset) => {
			if (!containerWidth) return;

			const assetKey = asset.hash || asset.localUri || asset.uri;
			const pixelSize = Math.floor(
				PixelRatio.getPixelSizeForLayoutSize(containerWidth),
			);

			const isCached = hasCachedImage(assetKey, pixelSize, pixelSize);
			if (isCached) {
				const cachedImage = getCachedImage(
					assetKey,
					pixelSize,
					pixelSize,
				);

				setImage(cachedImage);
				return;
			}

			manipulateAsync(
				asset.localUri || asset.uri,
				[
					{
						resize: {
							width: pixelSize,
						},
					},
				],
				{ format: SaveFormat.PNG },
			)
				.then((result) => {
					setImage(result);

					cacheImage(assetKey, pixelSize, pixelSize, result);
				})
				.catch((e) => {
					console.log(e);
				});
		},
		[containerWidth, source],
	);

	useEffect(() => {
		if (!source) return;

		Asset.fromModule(source)
			.downloadAsync()
			.then((asset) => downscaleToContainer(asset));
	}, [containerWidth, source]);

	return (
		<View
			ref={ref as any}
			style={[Styles.container, style]}
			onLayout={(e) => {
				setContainerHeight(e.nativeEvent.layout.height);
				setContainerWidth(e.nativeEvent.layout.width);
			}}
		>
			<Image
				source={image}
				style={[{ flex: 1 }, imageStyle]}
				transition={transition}
				{...rest}
			/>
		</View>
	);
});

const AnimatedPerformantImage = Animated.createAnimatedComponent(Component);

export default Component;
export { AnimatedPerformantImage };

const Styles = StyleSheet.create({
	container: { width: '100%' },
});
