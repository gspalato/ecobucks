import { Image } from 'expo-image';
import { Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Animated, { FadeIn } from 'react-native-reanimated';
import tw from 'twrnc';

import DefaultHeader from '@components/DefaultHeader';
import SafeView from '@components/SafeView';
import Screen from '@components/Screen';

import Gradients from '@lib/assets/gradients';

import { getFontSize } from '@/lib/fonts';

const Component: React.FC = (props) => {
	return (
		<Screen tab transition>
			<SafeView edges={['top']} style={[tw`flex-1`]}>
				<DefaultHeader title='Store' />
				<ScrollView
					style={Styles.list}
					contentContainerStyle={{
						flexGrow: 1,
						justifyContent: 'space-between',
					}}
				>
					<TouchableOpacity>
						<Animated.View
							style={[
								tw`flex h-60 w-[47.5%] rounded-md bg-[#f4f4f4] p-2 shadow-md`,
							]}
						>
							<Image
								style={[
									tw`mx-auto aspect-square w-full rounded-md`,
								]}
								source={Gradients.Gradient20}
								placeholder={'#00000022'}
							/>
							<Text
								ellipsizeMode='tail'
								style={[
									{
										paddingTop: 10,
										textAlign: 'center',
										fontFamily: 'Syne_700Bold',
										fontSize: getFontSize(17),
									},
								]}
							>
								Example
							</Text>
						</Animated.View>
					</TouchableOpacity>
				</ScrollView>
			</SafeView>
		</Screen>
	);
};

export default Component;

const Styles = {
	list: [tw`mb-0 p-4 pb-0`],
};
