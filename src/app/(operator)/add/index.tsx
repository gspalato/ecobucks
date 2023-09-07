import { useMutation } from '@apollo/client';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
	FlatList,
	SafeAreaView,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import tw from 'twrnc';

import Button from '@/components/Button';

import { useAuthToken } from '@/lib/auth';
import * as RegisterDisposal from '@/lib/graphql/mutations/registerDisposal';

import { DisposalType } from '@/types/DisposalClaim';

import BackButton from './components/BackButton';
import DisposalField from './components/DisposalField';

export type DisposalField = {
	_id: number;
	weight?: number;
	disposalType?: DisposalType;
};

// This is an early development only implementation.
// In the future, the rates will be set and calculated on the server.
const PER_TYPE_RATE_KG = {
	[DisposalType.RECYCLABLE]: 100,
	[DisposalType.SPONGE]: 250,
	[DisposalType.BATTERY]: 500,
	[DisposalType.ELECTRONIC]: 1000,
};

const Screen: React.FC = () => {
	const [token, setToken] = useState<string | null>(null);
	useAuthToken(setToken);

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
					params: { id: data.registerDisposal.disposal.token },
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
		<SafeAreaView style={tw`flex-1`}>
			<View
				style={[
					tw`min-h-12 flex w-full flex-row border-b border-[#00000011]`,
				]}
			>
				<BackButton />
				<Text
					style={[
						tw`my-auto w-full text-center text-2xl font-bold`,
						{ fontFamily: 'Inter Bold' },
					]}
				>
					Add Disposal
				</Text>
			</View>
			<View style={[tw`flex-1`]}>
				<FlatList
					data={disposalFields}
					extraData={disposalFields.length}
					renderItem={({ item, index }) => (
						<>
							<DisposalField
								index={index}
								onDelete={() =>
									removeDisposalFieldByIndex(index)
								}
								update={setDisposalFields}
							/>
							{
								// If it's the last item, render the field and add button.
								index === disposalFields.length - 1 && (
									<TouchableOpacity
										onPress={addNewDisposalField}
									>
										<View style={Styles.addButton}>
											<Feather
												size={24}
												name='plus'
												color={'#000000'}
											/>
										</View>
									</TouchableOpacity>
								)
							}
						</>
					)}
					keyExtractor={(item) => item._id.toString()}
				/>
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
										PER_TYPE_RATE_KG[item.disposalType!],
									weight: item.weight,
									disposalType: item.disposalType,
								})),
							},
						});
					}}
				/>
			</View>
		</SafeAreaView>
	);
};

export default Screen;

const Styles = {
	addButton: [
		tw`w-90 h-13 text-4.25 z-10 mx-auto items-center justify-center rounded-lg p-3 text-center shadow-md`,
	],
	registerButton: {
		button: [
			tw`h-13 text-4.25 border-transparent mx-auto w-80 items-center justify-center rounded-lg bg-[#11da33] p-3 text-center`,
		],
		text: [tw`text-lg font-bold text-[#ffffff]`],
	},
};
