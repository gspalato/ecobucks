import { ScrollView, Swipeable } from 'react-native-gesture-handler';

import { useMutation } from '@apollo/client';
import { Feather } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import {
	LayoutAnimation,
	SafeAreaView,
	TouchableOpacity,
	View,
} from 'react-native';
import tw from 'twrnc';

import Button from '@components/Button';
import DefaultHeader from '@components/DefaultHeader';
import DisposalField from '@components/DisposalField';
import SwipeableRow from '@components/SwipeableRow';

import FoundationClient from '@lib/api/client';
import { useAuth, useAuthToken } from '@lib/auth';
import { getFontSize } from '@lib/fonts';
import { useHeaderLayout } from '@lib/layout';
import { RootStackParamList } from '@lib/navigation/types';
import { usePlatform } from '@lib/platform';

import { Disposal, DisposalType } from '@/types/DisposalClaim';

import { Colors, Defaults, Spacings } from '@/styles';

export type DisposalField = {
	_id: number;
	weight?: number;
	disposal_type?: DisposalType;
};

// This is an early development only implementation.
// In the future, the rates will be set and calculated on the server.
const DISPOSAL_TYPE_ENUM_NAME = {
	[DisposalType.RECYCLABLE]: 'RECYCLABLE',
	[DisposalType.SPONGE]: 'SPONGE',
	[DisposalType.BATTERY]: 'BATTERY',
	[DisposalType.ELECTRONIC]: 'ELECTRONIC',
};

const PER_TYPE_RATE_KG = {
	[DisposalType.RECYCLABLE]: 100,
	[DisposalType.SPONGE]: 250,
	[DisposalType.BATTERY]: 500,
	[DisposalType.ELECTRONIC]: 1000,
};

type Props = StackScreenProps<RootStackParamList, 'Add'>;

const Screen: React.FC<Props> = (props) => {
	const { navigation, route } = props;

	const { token } = useAuth();

	const { SafeAreaStyle } = usePlatform();

	const [disposalFields, setDisposalFields] = useState<DisposalField[]>([
		{ _id: 0, weight: undefined, disposal_type: undefined },
	]);

	useEffect(() => {
		console.log(disposalFields);
	}, [disposalFields]);

	const { height: headerHeight } = useHeaderLayout();

	const addNewDisposalField = () => {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		setDisposalFields((prev) => [
			...prev,
			{ _id: prev.length, weight: undefined, disposalType: undefined },
		]);
	};

	const removeDisposalFieldByIndex = (index: number) => {
		setDisposalFields((prev) => {
			const newDisposalFields = [...prev];
			newDisposalFields.splice(index, 1);
			return newDisposalFields;
		});
	};

	const onRegisterPress = () => {
		if (!token) {
			alert('Authentication expired.');
			return;
		}

		disposalFields.forEach((f, i) =>
			console.log(f._id, f.weight, f.disposal_type),
		);

		if (
			disposalFields.some(
				(item) =>
					item.weight === undefined ||
					item.disposal_type === undefined,
			)
		) {
			alert('Please fill all fields.');
			return;
		}

		const disposals: Disposal[] = disposalFields.map((item) => ({
			weight: item.weight!,
			disposal_type: item.disposal_type!,
			credits:
				(item.weight! / 1000) * PER_TYPE_RATE_KG[item.disposal_type!],
		}));

		FoundationClient.RegisterDisposal(disposals, token)
			.then(async (r) => {
				try {
					const data = await r.json();
					console.log(data);

					if (!data.success || data.error) {
						alert(`Failed to register disposal.\n${data.error}`);
						return;
					}

					console.log(data.disposal.token, data.disposal.credits);

					navigation.push('QRCode', {
						id: data.disposal.token,
						credits: data.disposal.credits,
					});
				} catch (e) {
					alert(`Failed to register disposal (internal error).`);
					console.log(e);
				}
			})
			.catch((e) => {
				alert(
					`Failed to register disposal (internal error).\n${e.message}`,
				);
				alert(e.cause);
				alert(e.message);
				alert(e.stack);
			});
	};

	return (
		<>
			<SafeAreaView
				style={[
					SafeAreaStyle,
					{
						flexGrow: 1,
						marginTop: headerHeight,
						backgroundColor: '#ffffff',
					},
				]}
			>
				<ScrollView style={{ flexGrow: 1, width: '100%' }}>
					{disposalFields.map((item, index) => (
						<SwipeableRow
							key={index}
							containerStyle={{
								height: 60 * Spacings.Unit,
								borderBottomWidth: 1,
								borderColor: '#00000011',
							}}
							rightButtons={[
								{
									backgroundColor: '#ff0000',
									text: 'Delete',
									onPress: () => {
										console.log('pressed');
										removeDisposalFieldByIndex(index);
									},
								},
							]}
						>
							<DisposalField
								key={index}
								index={index}
								onDelete={() => {
									LayoutAnimation.configureNext(
										LayoutAnimation.Presets.easeInEaseOut,
									);
									removeDisposalFieldByIndex(index);
								}}
								onUpdate={(f) => {
									console.log(JSON.stringify(f));
									setDisposalFields(f);
								}}
							/>
						</SwipeableRow>
					))}
					<TouchableOpacity onPress={addNewDisposalField}>
						<View style={Styles.addButton}>
							<Feather size={24} name='plus' color={'#000000'} />
						</View>
					</TouchableOpacity>
				</ScrollView>
				<View
					style={{
						alignItems: 'center',
						display: 'flex',
						height: 70,
						justifyContent: 'center',
						paddingHorizontal: 20,
						width: '100%',
					}}
				>
					<Button
						text='Register'
						buttonStyle={{
							height: 20 * Spacings.Unit,
							width: 100 * Spacings.Unit,
						}}
						onPress={onRegisterPress}
					/>
				</View>
			</SafeAreaView>
			<View
				style={{
					position: 'absolute',
					width: '100%',
					flex: 1,
					backgroundColor: '#ffffff',
				}}
			>
				<DefaultHeader title={'Register Disposal'} blurIntensity={90} />
			</View>
		</>
	);
};

export default Screen;

const Styles = {
	addButton: [
		tw`z-10 mx-auto items-center justify-center rounded-lg p-3 text-center`,
		{
			fontSize: getFontSize(17),
		},
	],
	registerButton: {
		button: [
			tw`h-13 w-80 rounded-lg p-3`,
			{
				borderColor: 'transparent',
				background: '#11da33',
				marginHorizontal: 'auto',
				fontSize: getFontSize(17),
				textAlign: 'center',
			},
		],
		text: [tw`text-[#ffffff]`, { fontSize: getFontSize(17) }],
	},
};
