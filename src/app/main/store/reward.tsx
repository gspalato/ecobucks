import { StackScreenProps } from '@react-navigation/stack';
import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
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

import { Colors, Defaults, Defaults as DefaultStyles } from '@/styles';

import { StoreStackParamList } from '.';

type Props = StackScreenProps<StoreStackParamList, 'Reward'>;

const Component: React.FC<Props> = (props) => {
	const { navigation, route } = props;
	const { id, image, name, price } = route.params;

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
						marginBottom: 30,
						textAlign: 'center',
						width: '100%',
					}}
				>
					{name}
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
						alignItems: 'flex-start',
						display: 'flex',
						flexDirection: 'row',
						height: 70 + tabBarHeight,
						justifyContent: 'flex-start',
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
				<View
					style={{
						alignItems: 'center',
						flexDirection: 'row',
						gap: 20,
						height: 50,
						marginVertical: 10,
						paddingHorizontal: 20,
						width: '100%',
					}}
				>
					<Text
						style={{
							fontFamily: 'BricolageGrotesque_700Bold',
							fontSize: getFontSize(25),
							textAlign: 'center',
							width: '25%',
						}}
					>
						${price}
					</Text>
					<View style={{ paddingRight: 20, width: '75%' }}>
						<Button
							text='Redeem'
							buttonStyle={{
								height: '100%',
								backgroundColor: Colors.Accent,
								borderWidth: 0,
								borderRadius: 3 * Defaults.Spacing,
								padding: 3 * Defaults.Spacing,
								width: '100%',
							}}
							textStyle={{
								color: '#ffffff',
								fontSize: getFontSize(17),
							}}
						/>
					</View>
				</View>
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
