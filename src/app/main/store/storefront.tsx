import { StackScreenProps } from '@react-navigation/stack';
import { Image } from 'expo-image';
import { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';

import DefaultHeader from '@components/DefaultHeader';
import Loading from '@components/Loading';
import Screen from '@components/Screen';

import Gradients from '@lib/assets/gradients';
import { useHeaderLayout, useTabBarLayout } from '@lib/layout';

import { getFontSize } from '@/lib/fonts';

import { Colors, Defaults } from '@/styles';

import { StoreStackParamList } from '.';

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

type Props = StackScreenProps<StoreStackParamList, 'Storefront'>;

const Component: React.FC<Props> = (props) => {
	const { navigation } = props;

	const [loading, setLoading] = useState(false);

	const { height: headerHeight } = useHeaderLayout();
	const { height: tabBarHeight } = useTabBarLayout();

	if (loading) return <Loading />;

	return (
		<Screen>
			<View style={{ flexGrow: 1 }}>
				<FlatList
					contentContainerStyle={[
						{
							backgroundColor: Colors.Background,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							paddingTop: headerHeight,
							paddingBottom: tabBarHeight,
						},
					]}
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
								navigation.navigate('Reward', {
									id: info.index,
									image: info.item.image,
									name: info.item.name,
									price: info.item.price,
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
