import { Asset } from 'expo-asset';
import { Image, ImageProps, ImageStyle } from 'expo-image';
import {
	ImageResult,
	manipulateAsync,
	SaveFormat,
} from 'expo-image-manipulator';
import React, {
	forwardRef,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';
import {
	PixelRatio,
	StyleProp,
	StyleSheet,
	View,
	ViewStyle,
} from 'react-native';
import Animated from 'react-native-reanimated';

import { PerformantImageContext } from './PerformantImageProvider';

type PerformantImageProps = {
	source: any;
	containerStyle?: StyleProp<ViewStyle>;
	imageStyle?: StyleProp<ImageStyle>;
} & ImageProps;

const Component: React.FC<PerformantImageProps> = forwardRef((props, ref) => {
	const {
		containerStyle,
		imageStyle,
		source,
		style,
		transition = 100,
		...rest
	} = props;

	const [containerWidth, setContainerWidth] = useState(0);

	const [image, setImage] = useState<ImageResult | null>(source);

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

				console.log(
					`[PerformantImage] Found cached image (${cachedImage?.uri.slice(
						-20,
					)}) for original "...${assetKey.slice(
						-20,
					)}" with dimensions ${pixelSize}x${pixelSize}.`,
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
					console.log(
						`[PerformantImage] Resized image "...${assetKey.slice(
							-20,
						)}" with dimensions ${pixelSize}x${pixelSize} (${result.uri.slice(
							-20,
						)}).`,
					);

					setImage(result);

					cacheImage(assetKey, pixelSize, pixelSize, result);

					console.log(
						`[PerformantImage] Cached image "...${assetKey.slice(
							-20,
						)}" with dimensions ${pixelSize}x${pixelSize}.`,
					);
				})
				.catch((e) => {
					console.log(e);
				});
		},
		[containerWidth, source],
	);

	useEffect(() => {
		Asset.fromModule(source)
			.downloadAsync()
			.then((asset) => {
				downscaleToContainer(asset);
			});
	}, [containerWidth, source]);

	return (
		<View
			ref={ref as any}
			style={[Styles.container, style]}
			onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
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
