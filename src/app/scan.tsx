import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BarCodeScannedCallback, BarCodeScanner } from 'expo-barcode-scanner';
import * as Haptics from 'expo-haptics';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import tw from 'twrnc';

import DefaultHeader from '@components/DefaultHeader';
import Screen from '@components/Screen';

import Loading from '@/components/Loading';
import ClaimSuccessModal from '@/components/Modals/ClaimSuccessModal';

import { useAuth, useAuthToken } from '@lib/auth';

import FoundationClient from '@/lib/api/client';
import { RootStackParamList } from '@/lib/navigation/types';

import Constants from '@/constants';

type Props = NativeStackScreenProps<RootStackParamList, 'Scan'>;

const Component: React.FC<Props> = (props) => {
	const { navigation } = props;

	const [hasPermission, setHasPermission] = useState<boolean | null>(null);
	const [scanned, setScanned] = useState<boolean>(false);

	const [success, setSuccess] = useState<boolean | null>(null);

	const [displaySuccessModal, setDisplaySuccessModal] = useState(false);
	const [claimedCredits, setClaimedCredits] = useState<number | null>(null);

	const { token } = useAuth();

	/*
	const [claim, { loading }] =
		useMutation<ClaimDisposalAndCredits.ReturnType>(
			ClaimDisposalAndCredits.Mutation,
			{
				onCompleted(data) {
					setSuccess(data.claimDisposalAndCredits.success);

					const disposalClaim = data.claimDisposalAndCredits.disposal;
					if (!data.claimDisposalAndCredits.success) {
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
					navigation.push('Main');
				},
			},
		);
	*/

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
		if (!data.data.startsWith(Constants.CLAIM_DISPOSAL_QRCODE_PREFIX)) {
			alert('Invalid QRCode.');
			return;
		}

		disposalToken = data.data.slice(
			Constants.CLAIM_DISPOSAL_QRCODE_PREFIX.length,
		);

		if (!token) {
			console.log('No token provided.');
			return;
		}

		FoundationClient.ClaimDisposal(disposalToken, token)
			.then(async (r) => {
				console.log(r);

				if (!r.ok) {
					alert('Failed to claim disposal.');
					return;
				}

				const payload = await r.json();

				setSuccess(payload.success);

				const disposalClaim = payload.disposal;
				if (!payload.success) {
					console.log(payload.error);
					alert(payload.error);
					return;
				}

				setClaimedCredits(disposalClaim.credits);
				setDisplaySuccessModal(true);
			})
			.catch((e) => {
				console.log(e);
				alert(`Failed to claim.`);
				setSuccess(false);
				navigation.push('Main');
			});
	};

	const onSuccessModalClose = () => {
		setDisplaySuccessModal(false);
		setClaimedCredits(null);
		navigation.push('Main');
	};

	return (
		<Screen>
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
					{
						alignItems: 'center',
						backgroundColor: '#000',
						flexGrow: 1,
						margin: 0,
						padding: 0,
					},
					StyleSheet.absoluteFillObject,
				]}
			>
				{hasPermission === null && <Loading />}
				{hasPermission === false && <Text>No access to camera</Text>}
				{hasPermission && (
					<BarCodeScanner
						onBarCodeScanned={
							scanned ? undefined : handleBarCodeScanned
						}
						style={[
							tw`mt-0 h-full flex-1 p-0`,
							{
								width: Dimensions.get('screen').width,
								height: Dimensions.get('screen').height,
							},
							StyleSheet.absoluteFillObject,
						]}
					/>
				)}
			</View>
			<View style={{ flex: 1, position: 'absolute', width: '100%' }}>
				<DefaultHeader
					backButtonColor='#ffffff'
					blurTint='dark'
					blurIntensity={0}
					headerStyle={{
						backgroundColor: '#00000000',
						justifyContent: 'center',
						width: '100%',
					}}
					titleStyle={{ color: 'white' }}
					title='Scan'
				/>
			</View>
		</Screen>
	);
};

export default Component;
