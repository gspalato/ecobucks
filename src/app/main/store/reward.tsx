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

import PerformantImage from '@/components/PerformantImage';
import Subtitle from '@/components/Subtitle';

import { getFontSize } from '@lib/fonts';
import { useHeaderLayout, useTabBarLayout } from '@lib/layout';

import { Colors, Defaults, Radius, Spacings } from '@/styles';

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
		<Screen>
			<ScrollView
				style={[
					Defaults.View,
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
				<PerformantImage
					source={image}
					transition={100}
					placeholder={'#ccc'}
					style={{
						aspectRatio: 4 / 3,
						marginBottom: 30,
						padding: 5,
						width: '100%',
					}}
					imageStyle={{
						borderRadius: 15,
					}}
					onLoad={() => setLoading(false)}
				/>
				<Text
					style={{
						fontFamily: 'Syne_700Bold',
						fontSize: getFontSize(30),
						marginBottom: 45,
						textAlign: 'center',
						width: '100%',
					}}
				>
					{name}
				</Text>
				<Subtitle
					style={{
						paddingBottom: 7.5 * Spacings.Unit,
						paddingHorizontal: 30,
						//width: '100%',
					}}
				>
					Description
				</Subtitle>
				<Text
					style={{
						color: '#666',
						fontFamily: 'Inter_400Regular',
						fontSize: getFontSize(14),
						paddingHorizontal: 30,
						textAlign: 'left',
						width: '100%',
					}}
				>
					Lorem ipsum dolor sit, amet consectetur adipisicing elit.
					Nisi optio, eveniet laudantium odio natus exercitationem ab
					qui ducimus soluta consequuntur? Culpa dolore rerum
					doloremque? Qui aspernatur fugit totam nobis laudantium
					commodi vitae voluptas nesciunt iste dignissimos doloremque,
					quod tenetur eos porro perspiciatis perferendis quam!
					Inventore quia est libero fugiat quo soluta incidunt
					asperiores, vero dolor repellendus tenetur. Officiis, soluta
					deserunt.
				</Text>
			</ScrollView>
			<View
				style={[
					Defaults.View,
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
								borderRadius: Radius.Medium,
								padding: 3 * Spacings.Unit,
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
