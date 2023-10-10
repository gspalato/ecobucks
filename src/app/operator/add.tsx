import { ScrollView } from 'react-native-gesture-handler';

import { useMutation } from '@apollo/client';
import { Feather } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';

import DisposalField from '@components/DisposalField';

import Button from '@/components/Button';
import DefaultHeader from '@/components/DefaultHeader';
import ClaimSuccessModal from '@/components/Modals/ClaimSuccessModal';
import SafeView from '@/components/SafeView';

import { useAuthToken } from '@/lib/auth';
import { getFontSize } from '@/lib/fonts';
import * as RegisterDisposal from '@/lib/graphql/mutations/registerDisposal';
import { useHeaderLayout } from '@/lib/layout';
import { RootStackParamList } from '@/lib/navigation/types';
import { usePlatform } from '@/lib/platform';

import { DisposalType } from '@/types/DisposalClaim';

import { Colors, Defaults } from '@/styles';

export type DisposalField = {
	_id: number;
	weight?: number;
	disposalType?: DisposalType;
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

	const [token, setToken] = useState<string | null>(null);
	useAuthToken(setToken);

	const { isAndroid, SafeAreaStyle } = usePlatform();

	const [claimedCredits, setClaimedCredits] = useState<number | null>(null);
	const [displaySuccessModal, setDisplaySuccessModal] = useState(false);

	const [disposalFields, setDisposalFields] = useState<DisposalField[]>([
		{ _id: 0, weight: undefined, disposalType: undefined },
	]);

	const [redeemButtonHeight, setRedeemButtonHeight] = useState(0);

	const { height: headerHeight } = useHeaderLayout();

	const addNewDisposalField = () => {
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

	const onSuccessModalClose = () => {
		setDisplaySuccessModal(false);
		setClaimedCredits(null);
		navigation.push('Main');
	};

	const [register] = useMutation<RegisterDisposal.ReturnType>(
		RegisterDisposal.Mutation,
		{
			fetchPolicy: 'no-cache',
			onCompleted: (data) => {
				if (
					!data.registerDisposal.successful ||
					data.registerDisposal.error
				) {
					alert(
						`Failed to register disposal.\n${data.registerDisposal.error}`,
					);
					return;
				}

				navigation.push('QRCode', {
					id: data.registerDisposal.disposal.token,
					credits: data.registerDisposal.disposal.credits,
				});
			},
			onError: (error) => {
				alert(
					`Failed to register disposal (internal error).\n${error.message}`,
				);
				console.log(error.cause);
				console.log(error.message);
				console.log(error.stack);
			},
		},
	);

	return (
		<>
			{displaySuccessModal && (
				<ClaimSuccessModal
					credits={claimedCredits!}
					visible={displaySuccessModal}
					onClose={onSuccessModalClose}
					onPress={onSuccessModalClose}
				/>
			)}
			<SafeAreaView
				style={[
					SafeAreaStyle,
					{ flexGrow: 1, marginTop: headerHeight },
				]}
			>
				<ScrollView style={{ flexGrow: 1, width: '100%' }}>
					{disposalFields.map((item, index) => (
						<DisposalField
							key={index}
							index={index}
							onDelete={() => removeDisposalFieldByIndex(index)}
							onUpdate={setDisposalFields}
						/>
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
							height: 20 * Defaults.Spacing,
							width: 100 * Defaults.Spacing,
						}}
						onPress={() => {
							if (!token) {
								alert('Authentication expired.');
								return;
							}

							if (
								disposalFields.some(
									(item) =>
										!item.weight || !item.disposalType,
								)
							) {
								alert('Please fill all fields.');
								return;
							}

							register({
								variables: {
									operatorToken: token!,
									disposals: disposalFields.map((item) => ({
										weight: item.weight!,
										disposalType:
											DISPOSAL_TYPE_ENUM_NAME[
												item.disposalType!
											],
										credits:
											(item.weight! / 1000) *
											PER_TYPE_RATE_KG[
												item.disposalType!
											],
									})),
								},
							});
						}}
					/>
				</View>
			</SafeAreaView>
			<View style={[tw`absolute w-full flex-1`]}>
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
			tw`h-13 border-transparent mx-auto w-80 rounded-lg bg-[#11da33] p-3 text-center`,
			{
				fontSize: getFontSize(17),
			},
		],
		text: [tw`text-[#ffffff]`, { fontSize: getFontSize(17) }],
	},
};
