import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Text } from 'react-native';
import tw from 'twrnc';

import Button from '@components/Button';
import DefaultHeader from '@components/DefaultHeader';
import Loading from '@components/Loading';
import Screen from '@components/Screen';

import { getFontSize } from '@lib/fonts';
import { useHeaderLayout, useTabBarLayout } from '@lib/layout';

import { Colors, Defaults as DefaultStyles } from '@/styles';

const Component: React.FC = () => {
	const { id, image, name, price } = useLocalSearchParams();

	const [loading, setLoading] = useState(false);

	const [redeemButtonHeight, setRedeemButtonHeight] = useState(0);
	const { height: headerHeight } = useHeaderLayout();
	const { height: tabBarHeight } = useTabBarLayout();

	if (loading) return <Loading />;

	return (
		<Screen transition>
			<ScrollView
				style={[
					DefaultStyles.View,
					{
						flexGrow: 1,
					},
				]}
				contentContainerStyle={{
					display: 'flex',
					alignItems: 'center',
					paddingTop: headerHeight + 10,
					paddingBottom: 10,
					paddingHorizontal: 10,
				}}
			>
				<Image
					source={Number(image)}
					transition={100}
					placeholder={'#ccc'}
					style={{
						aspectRatio: 4 / 3,
						borderRadius: 15,
						marginBottom: 20,
						padding: 5,
						width: '100%',
					}}
					onLoad={() => setLoading(false)}
				/>
				<Text
					style={{
						fontFamily: 'Syne_700Bold',
						fontSize: getFontSize(30),
						marginBottom: 10,
						textAlign: 'center',
						width: '100%',
					}}
				>
					{name}
				</Text>
				<Text
					style={{
						fontFamily: 'BricolageGrotesque_700Bold',
						fontSize: getFontSize(25),
						paddingBottom: 40,
						textAlign: 'center',
						width: '100%',
					}}
				>
					${price}
				</Text>
				<View
					style={{
						flexGrow: 1,
						marginBottom: 40,
						width: '100%',
					}}
				>
					<Text
						style={{
							color: '#666',
							fontFamily: 'Inter_400Regular',
							fontSize: getFontSize(15),
							paddingHorizontal: 20,
							textAlign: 'left',
							width: '100%',
						}}
					>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Quam repellat nam cumque molestias iste commodi ratione
						quae, voluptate beatae odit molestiae, deserunt vero?
						Omnis ad illum distinctio impedit reiciendis saepe vel
						ducimus officia aliquid ea error maiores, veritatis
						dolorum cupiditate, atque nemo. Illum atque ab quis
						totam voluptatibus iusto at modi distinctio expedita
						natus odio eos repellendus dolor quae ipsa fugiat quos
						explicabo, velit delectus laudantium est possimus
						officia nemo! Corrupti fugit, repellat eaque non
						possimus esse quo repellendus iusto enim, quis quidem
						tempora minus. Et voluptatibus aliquid consectetur sed
						doloribus, delectus ullam veritatis odit repellat
						praesentium ipsam possimus harum!
					</Text>
				</View>
			</ScrollView>
			<View
				style={[
					DefaultStyles.View,
					{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						left: 0,
						right: 0,
						bottom: 0,
						width: '100%',
					},
				]}
				onLayout={(e) =>
					setRedeemButtonHeight(e.nativeEvent.layout.height)
				}
			>
				<Button
					text='Redeem'
					buttonStyle={[
						Styles.redeemButton.button,
						{ marginTop: 0, marginBottom: tabBarHeight + 10 },
					]}
					textStyle={Styles.redeemButton.text}
				/>
			</View>
			<View
				style={[
					{
						position: 'absolute',
						bottom: 0,
						width: '100%',
						marginBottom: redeemButtonHeight,
					},
				]}
			>
				<LinearGradient
					style={{ height: 20, width: '100%' }}
					colors={['#f9f9f900', '#f9f9f9']}
				/>
			</View>
			<View style={[tw`absolute w-full flex-1`]}>
				<DefaultHeader title={'Store'} blurIntensity={90} />
			</View>
		</Screen>
	);
};

export default Component;

const Styles = {
	redeemButton: {
		button: [
			tw`h-13 border-transparent w-80 rounded-lg bg-[#11da33] p-3 text-center`,
			{
				fontSize: getFontSize(17),
			},
		],
		text: [tw`text-[#ffffff]`, { fontSize: getFontSize(17) }],
	},
};
