import { useMutation } from '@apollo/client';
import { BarCodeScannedCallback, BarCodeScanner } from 'expo-barcode-scanner';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import tw from 'twrnc';

import { useAuth, useAuthToken } from '@lib/auth';
import * as ClaimDisposalAndCredits from '@lib/graphql/mutations/claimDisposalAndCredits';

import Constants from '@/constants';

const Screen: React.FC<any> = ({ navigation }) => {
	const [hasPermission, setHasPermission] = useState<boolean | null>(null);
	const [scanned, setScanned] = useState<boolean>(false);

	const [token, setToken] = useState<string | null>(null);

	const [success, setSuccess] = useState<boolean | null>(null);
	const [disposal, setDisposal] = useState<string | null>(null);

	const { setProfile } = useAuth();
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

					router.replace({
						pathname: '/claim_success_modal',
						params: { credits: disposalClaim.credits },
					});
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
		if (data.type !== 'org.iso.QRCode') {
			setScanned(false);
			return;
		}

		setScanned(true);

		Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

		let disposalToken;
		if (data.data.startsWith(Constants.CLAIM_DISPOSAL_QRCODE_PREFIX))
			disposalToken = data.data.slice(
				Constants.CLAIM_DISPOSAL_QRCODE_PREFIX.length,
			);

		claim({
			variables: {
				userToken: token,
				disposalToken: disposalToken,
			},
		});
	};

	if (hasPermission === null) {
		return <Text>Requesting for camera permission</Text>;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	return (
		<View style={tw`flex-1 items-center`}>
			<BarCodeScanner
				onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
				style={StyleSheet.absoluteFillObject}
			/>
			{scanned && (
				<Button
					title={'Tap to Scan Again'}
					onPress={() => setScanned(false)}
				/>
			)}
		</View>
	);
};

export default Screen;
