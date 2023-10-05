import { useMutation } from '@apollo/client';
import { BarCodeScannedCallback, BarCodeScanner } from 'expo-barcode-scanner';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import tw from 'twrnc';

import DefaultHeader from '@components/DefaultHeader';
import ClaimSuccessModal from '@components/modals/ClaimSuccessModal';
import SafeView from '@components/SafeView';
import Screen from '@components/Screen';

import { useAuthToken } from '@lib/auth';
import * as ClaimDisposalAndCredits from '@lib/graphql/mutations/claimDisposalAndCredits';

import Constants from '@/constants';

const Component: React.FC = () => {
	const [hasPermission, setHasPermission] = useState<boolean | null>(null);
	const [scanned, setScanned] = useState<boolean>(false);

	const [token, setToken] = useState<string | null>(null);

	const [success, setSuccess] = useState<boolean | null>(null);

	const [displaySuccessModal, setDisplaySuccessModal] = useState(false);
	const [claimedCredits, setClaimedCredits] = useState<number | null>(null);

	useAuthToken(setToken);

	const [claim, { loading }] =
		useMutation<ClaimDisposalAndCredits.ReturnType>(
			ClaimDisposalAndCredits.Mutation,
			{
				onCompleted(data) {
					setSuccess(data.claimDisposalAndCredits.successful);

					const disposalClaim = data.claimDisposalAndCredits.disposal;
					if (!data.claimDisposalAndCredits.successful) {
						console.log(data.claimDisposalAndCredits.error);
						alert(data.claimDisposalAndCredits.error);
						return;
					}

					setClaimedCredits(disposalClaim.credits);
					setDisplaySuccessModal(true);
				},
				onError(e) {
					alert(`Failed to claim.\n${e.message}`);
					setSuccess(false);
					router.replace('/home/');
				},
			},
		);

	useEffect(() => {
		const getBarCodeScannerPermissions = async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync();
			setHasPermission(status === 'granted');
		};

		getBarCodeScannerPermissions();
	}, []);

	const handleBarCodeScanned: BarCodeScannedCallback = (data) => {
		let qrcode = ['org.iso.QRCode', '256', 256];
		if (!qrcode.some((e) => e == data.type)) {
			setScanned(false);
			return;
		}

		setScanned(true);

		Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

		let disposalToken;
		if (data.data.startsWith(Constants.CLAIM_DISPOSAL_QRCODE_PREFIX)) {
			disposalToken = data.data.slice(
				Constants.CLAIM_DISPOSAL_QRCODE_PREFIX.length,
			);

			claim({
				variables: {
					userToken: token,
					disposalToken: disposalToken,
				},
			});
		} else {
			alert('Invalid QRCode.');
		}
	};

	const onSuccessModalClose = () => {
		setDisplaySuccessModal(false);
		setClaimedCredits(null);
		router.push('/home/');
	};

	if (hasPermission === null) {
		return <Text>Requesting for camera permission</Text>;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	return (
		<Screen tab transition>
			{displaySuccessModal && (
				<ClaimSuccessModal
					credits={claimedCredits!}
					visible={displaySuccessModal}
					onClose={onSuccessModalClose}
					onPress={onSuccessModalClose}
				/>
			)}
			<View
				style={[
					tw`m-0 h-full flex-1 items-center p-0`,
					StyleSheet.absoluteFillObject,
				]}
			>
				<BarCodeScanner
					onBarCodeScanned={
						scanned ? undefined : handleBarCodeScanned
					}
					style={[
						tw`mt-0 h-full flex-1 p-0`,
						StyleSheet.absoluteFillObject,
					]}
				/>
			</View>
			<SafeView style={[tw`absolute w-full flex-1`]}>
				<DefaultHeader
					headerStyle={tw`w-full justify-center`}
					backButtonColor='#ffffff'
					titleStyle={[tw`text-white`]}
					title='Scan'
				/>
			</SafeView>
		</Screen>
	);
};

export default Component;
