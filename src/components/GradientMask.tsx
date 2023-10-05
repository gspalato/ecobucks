import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import React, { JSXElementConstructor, ReactElement } from 'react';

type GradientMaskProps = {
	children: ReactElement<any, string | JSXElementConstructor<any>>;

	colors: string[];
	start: { x: number; y: number };
	end: { x: number; y: number };
};

const GradientMask: React.FC<GradientMaskProps> = (props) => {
	const { children, colors, start, end } = props;

	return (
		<MaskedView maskElement={children}>
			<LinearGradient colors={colors} start={start} end={end}>
				{children}
			</LinearGradient>
		</MaskedView>
	);
};

export default GradientMask;
