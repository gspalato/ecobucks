import { StyleProp, Text, ViewStyle } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import { fontSizes } from '@/lib/fonts';

import { Spacings } from '@/styles';

type SubtitleProps = {
	children: string;
	style?: StyleProp<ViewStyle>;
};

const Component: React.FC<SubtitleProps> = (props) => {
	const { children, style } = props;

	return (
		<Text
			style={[
				{
					color: Colors.Text,
					fontSize: fontSizes.md,
					fontFamily: 'Syne_600SemiBold',
					textAlign: 'left',
				},
				style,
			]}
		>
			{children}
		</Text>
	);
};

export default Component;
