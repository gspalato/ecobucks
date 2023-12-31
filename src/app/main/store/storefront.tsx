import { StackScreenProps } from '@react-navigation/stack';
import { FlashList } from '@shopify/flash-list';
import { Image } from 'expo-image';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';

import DefaultHeader from '@components/DefaultHeader';
import Loading from '@components/Loading';
import Screen from '@components/Screen';

import PerformantImage from '@/components/PerformantImage';

import { useHeaderLayout, useTabBarLayout } from '@lib/layout';

import CardStyles from '@/lib/assets/cardStyles';
import { getFontSize } from '@/lib/fonts';

import { Colors, Spacings } from '@/styles';

import { StoreStackParamList } from '.';

const TestRewards = [
	{
		image: CardStyles.Gradient20,
		name: 'Example Reward',
		price: 100,
	},
	{
		image: CardStyles.Gradient20,
		name: 'Example Reward',
		price: 200,
	},
	{
		image: CardStyles.Gradient20,
		name: 'Example Reward',
		price: 300,
	},
	{
		image: CardStyles.Gradient20,
		name: 'Example Reward',
		price: 400,
	},
	{
		image: CardStyles.Gradient20,
		name: 'Example Reward',
		price: 500,
	},
	{
		image: CardStyles.Gradient20,
		name: 'Example Reward',
		price: 600,
	},
	{
		image: CardStyles.Gradient20,
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
			<FlashList
				contentContainerStyle={{
					backgroundColor: Colors.Background,
					paddingTop: headerHeight,
					paddingBottom: tabBarHeight,
				}}
				data={TestRewards}
				estimatedItemSize={316}
				keyExtractor={(item, index) =>
					index + item.image + item.name + item.price
				}
				renderItem={(info) => (
					<TouchableOpacity
						style={{
							borderRadius: 10,
							display: 'flex',
							gap: 15,
							margin: 2.5,
							marginBottom: 10,
							marginHorizontal: 'auto',
							padding: 20,
							width: '100%',
						}}
						onPress={() =>
							navigation.navigate('Reward', {
								id: info.index,
								image: CardStyles[
									`Gradient${(info.index + 1) % 26}`
								],
								name: info.item.name,
								price: info.item.price,
							})
						}
					>
						<Image
							source={
								CardStyles[`Gradient${(info.index + 1) % 26}`]
							}
							style={{
								aspectRatio: 16 / 9,
								borderRadius: 15,
								width: '100%',
							}}
						/>
						<View style={{ display: 'flex', gap: 5 }}>
							<Text
								style={{
									fontFamily: 'Syne_600SemiBold',
									fontSize: getFontSize(18),
									textAlign: 'center',
								}}
							>
								{info.item.name}
							</Text>
							<Text
								style={{
									fontFamily: 'BricolageGrotesque_700Bold',
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
			<View style={{ flexGrow: 1, position: 'absolute', width: '100%' }}>
				<DefaultHeader
					showBackButton={false}
					title='Store'
					blurIntensity={90}
				/>
			</View>
		</Screen>
	);
};

export default Component;

const Styles = StyleSheet.create({
	list: { marginBottom: 0, padding: 2 * Spacings.Unit, paddingBottom: 0 },
});
