import { useMutation } from '@apollo/client';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import tw from 'twrnc';

import Button from '@/components/Button';
import DefaultHeader from '@/components/DefaultHeader';
import ClaimSuccessModal from '@/components/Modals/ClaimSuccessModal';

import { useAuthToken } from '@/lib/auth';
import { getFontSize } from '@/lib/fonts';
import * as RegisterDisposal from '@/lib/graphql/mutations/registerDisposal';
import { usePlatform } from '@/lib/platform';

import { DisposalType } from '@/types/DisposalClaim';

import DisposalField from './components/DisposalField';

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

const Screen: React.FC = () => {
	const [token, setToken] = useState<string | null>(null);
	useAuthToken(setToken);

	const { isAndroid, SafeAreaStyle } = usePlatform();

	const [claimedCredits, setClaimedCredits] = useState<number | null>(null);
	const [displaySuccessModal, setDisplaySuccessModal] = useState(false);

	const [disposalFields, setDisposalFields] = useState<DisposalField[]>([
		{ _id: 0, weight: undefined, disposalType: undefined },
	]);

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
		router.push('/home/');
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

				router.replace({
					pathname: '/(operator)/qrcode',
					params: {
						id: data.registerDisposal.disposal.token,
						credits: data.registerDisposal.disposal.credits,
					},
				});
			},
			onError: (error) => {
				alert(
					`Failed to register disposal (internal error).\n${error.message}`,
				);
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
			<SafeAreaView style={[tw`flex-1`, SafeAreaStyle]}>
				<DefaultHeader title='Register Disposal' />
				<View style={tw`flex-1`}>
					<ScrollView style={[tw`h-full w-full flex-1`]}>
						{disposalFields.map((item, index) => (
							<DisposalField
								key={index}
								index={index}
								onDelete={() =>
									removeDisposalFieldByIndex(index)
								}
								update={setDisposalFields}
							/>
						))}
						<TouchableOpacity onPress={addNewDisposalField}>
							<View style={Styles.addButton}>
								<Feather
									size={24}
									name='plus'
									color={'#000000'}
								/>
							</View>
						</TouchableOpacity>
					</ScrollView>
					<Button
						text='Register'
						buttonStyle={Styles.registerButton.button}
						textStyle={Styles.registerButton.text}
						onPress={() => {
							if (
								disposalFields.some(
									(item) =>
										item.weight === undefined ||
										item.disposalType === undefined,
								)
							)
								return alert('Please fill in all fields.');

							register({
								variables: {
									operatorToken: token,
									disposals: disposalFields.map((item) => ({
										credits:
											(item.weight! / 1000) *
											PER_TYPE_RATE_KG[
												item.disposalType!
											],
										weight: item.weight,
										disposalType: item.disposalType,
									})),
								},
							});
						}}
					/>
				</View>
			</SafeAreaView>
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
