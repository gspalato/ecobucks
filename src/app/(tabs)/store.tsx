import { Image } from 'expo-image';
import { useFocusEffect } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import tw from 'twrnc';

import DefaultHeader from '@components/DefaultHeader';
import SafeView from '@components/SafeView';
import Screen from '@components/Screen';

import Gradients from '@lib/assets/gradients';
import { useHeaderLayout, useTabBarLayout } from '@lib/layout';

import { getFontSize } from '@/lib/fonts';

const TestRewards = [
	{
		image: Gradients.Gradient20,
		name: 'Example Reward',
		price: 100,
	},
	{
		image: Gradients.Gradient20,
		name: 'Example Reward',
		price: 200,
	},
	{
		image: Gradients.Gradient20,
		name: 'Example Reward',
		price: 300,
	},
	{
		image: Gradients.Gradient20,
		name: 'Example Reward',
		price: 400,
	},
	{
		image: Gradients.Gradient20,
		name: 'Example Reward',
		price: 500,
	},
	{
		image: Gradients.Gradient20,
		name: 'Example Reward',
		price: 600,
	},
	{
		image: Gradients.Gradient20,
		name: 'Example Reward',
		price: 700,
	},
];

const Component: React.FC = (props) => {
	const {
		height: headerHeight,
		setBlurIntensity: setHeaderBlurIntensity,
		setBlurTint: setHeaderBlurTint,
	} = useHeaderLayout();
	const {
		height: tabBarHeight,
		setBlurIntensity: setTabBarBlurIntensity,
		setBlurTint: setTabBarBlurTint,
	} = useTabBarLayout();

	useFocusEffect(() => {
		setHeaderBlurIntensity?.(40);
		setTabBarBlurIntensity?.(40);
		setTabBarBlurTint?.('dark');

		return () => {
			setHeaderBlurIntensity?.(20);
			setTabBarBlurIntensity?.(20);
			setTabBarBlurTint?.('light');
		};
	});

	return (
		<Screen transition>
			<View style={[tw`flex-1`]}>
				<ScrollView
					style={{
						flexGrow: 1,
					}}
					contentContainerStyle={{
						display: 'flex',
						alignItems: 'center',
						paddingTop: headerHeight,
						paddingBottom: tabBarHeight,
					}}
				>
					{TestRewards.map((p, i) => (
						<TouchableOpacity
							key={i}
							style={[
								tw`flex-1`,
								{
									borderRadius: 10,
									display: 'flex',
									flexGrow: 1,
									gap: 15,
									margin: 2.5,
									marginHorizontal: 'auto',
									marginBottom: 10,
									padding: 15,
									width: '80%',
								},
							]}
						>
							<Image
								source={Gradients[`Gradient${(i + 1) % 27}`]}
								style={tw`aspect-square w-full rounded-md`}
							/>
							<View style={{ display: 'flex', gap: 5 }}>
								<Text
									style={{
										fontFamily: 'Syne_700Bold',
										fontSize: getFontSize(18),
										textAlign: 'center',
									}}
								>
									{p.name}
								</Text>
								<Text
									style={{
										fontFamily:
											'BricolageGrotesque_700Bold',
										fontSize: getFontSize(17),
										textAlign: 'center',
									}}
								>
									${p.price}
								</Text>
							</View>
						</TouchableOpacity>
					))}
				</ScrollView>
			</View>
			<View style={[tw`absolute w-full flex-1`]}>
				<DefaultHeader title='Store' blurIntensity={40} />
			</View>
		</Screen>
	);
};

export default Component;

const Styles = {
	list: [tw`mb-0 p-2 pb-0`],
};
