import { useMutation } from '@apollo/client';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import tw from 'twrnc';

import { useAuth, useAuthToken } from '@lib/auth';
import * as ClaimDisposalAndCredits from '@lib/graphql/mutations/claimDisposalAndCredits';

const Screen = () => {
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

					alert(
						`Successfully claimed ${disposalClaim.credits} credits!`,
					);
					router.replace('home');
				},
				onError(e) {
					alert(
						`Failed to claim.\n{}\n\n\n${e.message}\n${
							e.cause
						}\n${e.graphQLErrors.map((e) => e.message)}`,
					);
					setSuccess(false);
					router.replace('home');
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

	const handleBarCodeScanned = (data: any) => {
		if (data.type !== 'org.iso.QRCode') {
			setScanned(false);
			return;
		}

		setScanned(true);

		Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

		claim({
			variables: {
				userToken: token,
				disposalToken: data.data,
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
