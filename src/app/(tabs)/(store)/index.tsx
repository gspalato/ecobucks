import { ScrollView } from 'react-native-gesture-handler';

import { Image } from 'expo-image';
import { router, useFocusEffect } from 'expo-router';
import { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';

import DefaultHeader from '@components/DefaultHeader';
import SafeView from '@components/SafeView';
import Screen from '@components/Screen';

import Loading from '@/components/Loading';

import { useHeaderLayout, useTabBarLayout } from '@lib/layout';

import Gradients from '@/lib/assets/cardStyles';
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
	const [loading, setLoading] = useState(false);

	const { height: headerHeight } = useHeaderLayout();
	const { height: tabBarHeight } = useTabBarLayout();

	if (loading) return <Loading />;

	return (
		<Screen>
			<View style={{ flexGrow: 1 }}>
				<FlatList
					contentContainerStyle={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						paddingTop: headerHeight,
						paddingBottom: tabBarHeight,
					}}
					data={TestRewards}
					renderItem={(info) => (
						<TouchableOpacity
							key={info.index}
							style={[
								{
									borderRadius: 10,
									display: 'flex',
									gap: 15,
									margin: 2.5,
									marginHorizontal: 'auto',
									marginBottom: 10,
									padding: 15,
									width: '90%',
								},
							]}
							onPress={() =>
								router.push({
									pathname: '/(tabs)/(store)/reward',
									params: {
										id: info.index,
										image: Gradients[
											`Gradient${(info.index + 1) % 27}`
										],
										name: info.item.name,
										price: info.item.price,
									},
								})
							}
						>
							<Image
								source={
									Gradients[
										`Gradient${(info.index + 1) % 27}`
									]
								}
								style={tw`aspect-video w-full rounded-md`}
							/>
							<View style={{ display: 'flex', gap: 5 }}>
								<Text
									style={{
										fontFamily: 'Syne_700Bold',
										fontSize: getFontSize(18),
										textAlign: 'center',
									}}
								>
									{info.item.name}
								</Text>
								<Text
									style={{
										fontFamily:
											'BricolageGrotesque_700Bold',
										fontSize: getFontSize(17),
										textAlign: 'center',
									}}
								>
									${info.item.price}
								</Text>
							</View>
						</TouchableOpacity>
					)}
				/>
			</View>
			<View style={{ flexGrow: 1, position: 'absolute', width: '100%' }}>
				<DefaultHeader title='Store' blurIntensity={90} />
			</View>
		</Screen>
	);
};

export default Component;

const Styles = {
	list: [tw`mb-0 p-2 pb-0`],
};
