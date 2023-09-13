import { Image } from 'expo-image';
import { Dimensions, Text, View } from 'react-native';
import {
	FlatList,
	ScrollView,
	TouchableOpacity,
} from 'react-native-gesture-handler';
import tw from 'twrnc';

import BackButton from '@/components/BackButton';
import HeaderPadding from '@/components/HeaderPadding';
import SafeView from '@/components/SafeView';

import { fontSizes } from '@/lib/fonts';

import CardGradient1 from '@assets/gradients/gradient1.png';
import CardGradient2 from '@assets/gradients/gradient2.png';
import CardGradient3 from '@assets/gradients/gradient3.png';
import CardGradient4 from '@assets/gradients/gradient4.png';
import CardGradient5 from '@assets/gradients/gradient5.png';
import CardGradient6 from '@assets/gradients/gradient6.png';
import CardGradient7 from '@assets/gradients/gradient7.png';
import CardGradient8 from '@assets/gradients/gradient8.png';
import CardGradient9 from '@assets/gradients/gradient9.png';
import CardGradient10 from '@assets/gradients/gradient10.png';
import CardGradient11 from '@assets/gradients/gradient11.png';
import CardGradient12 from '@assets/gradients/gradient12.png';
import CardGradient13 from '@assets/gradients/gradient13.png';
import CardGradient14 from '@assets/gradients/gradient14.png';
import CardGradient15 from '@assets/gradients/gradient15.png';
import CardGradient16 from '@assets/gradients/gradient16.png';
import CardGradient17 from '@assets/gradients/gradient17.png';
import CardGradient18 from '@assets/gradients/gradient18.png';
import CardGradient19 from '@assets/gradients/gradient19.png';
import CardGradient20 from '@assets/gradients/gradient20.png';

const Gradients = [
	CardGradient1,
	CardGradient2,
	CardGradient3,
	CardGradient4,
	CardGradient5,
	CardGradient6,
	CardGradient7,
	CardGradient8,
	CardGradient9,
	CardGradient10,
	CardGradient11,
	CardGradient12,
	CardGradient13,
	CardGradient14,
	CardGradient15,
	CardGradient16,
	CardGradient17,
	CardGradient18,
	CardGradient19,
	CardGradient20,
];

const Screen = () => {
	const saveGradient = (g: any) => {};

	return (
		<SafeView style={[tw`flex-1`]}>
			<HeaderPadding style={tw`justify-center`}>
				<BackButton style={[tw`pl-2`]} />
				<Text
					numberOfLines={1}
					adjustsFontSizeToFit
					style={[
						tw`absolute w-full items-center justify-center text-center text-2xl`,
						{
							fontFamily: 'Syne_700Bold',
							alignSelf: 'center',
							pointerEvents: 'none',
							fontSize: fontSizes.title,
						},
					]}
				>
					Change Card Color
				</Text>
			</HeaderPadding>
			<ScrollView
				style={[
					tw`flex-1 flex-row flex-wrap bg-[#ffdddd]`,
					{ gap: 25 },
				]}
			>
				<FlatList
					data={Gradients}
					numColumns={2}
					columnWrapperStyle={[
						{ flex: 1, justifyContent: 'space-around' },
					]}
					renderItem={(info) => (
						<TouchableOpacity
							onPress={() => saveGradient(info.item)}
						>
							<View
								style={[
									tw`flex-1/2 items-center justify-center rounded-lg bg-[#aaaaff]`,
								]}
							>
								<Image
									source={CardGradient20}
									style={tw`aspect-video w-3/4 rounded-lg`}
									contentPosition={{ top: -10 }}
									priority='high'
									transition={750}
								/>
							</View>
						</TouchableOpacity>
					)}
				/>
			</ScrollView>
		</SafeView>
	);
};

export default Screen;

const Styles = {};
