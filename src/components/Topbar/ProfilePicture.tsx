import { TouchableOpacity } from 'react-native-gesture-handler';

import { useLazyQuery } from '@apollo/client';
import * as Haptics from 'expo-haptics';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { useCallback, useEffect, useRef, useState } from 'react';
import { StyleProp, useWindowDimensions, ViewStyle } from 'react-native';
import mime from 'react-native-mime-types';

import BottomSheet from '@components/BottomSheet';
import CustomButton from '@components/Button';
import { PerformantImageProps } from '@components/PerformantImage/PerformantImage';

import FoundationClient from '@/lib/api/client';
import { useAuth } from '@/lib/auth';

import { CheckAuthenticationPayload } from '@/types/CheckAuthenticationPayload';

import { Spacings } from '@/styles';

type ProfilePictureProps = {
	containerStyle?: StyleProp<ViewStyle>;
} & PerformantImageProps;

const Component: React.FC<ProfilePictureProps> = (props) => {
	const { containerStyle, source, style, ...rest } = props;

	const [reloadKey, setReloadKey] = useState<number>(0);
	const [profilePicture, setProfilePicture] = useState<string | null>();

	const settingsBottomSheetRef = useRef<any>();

	const { height } = useWindowDimensions();
	const { token } = useAuth();

	const onPress = useCallback(() => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

		settingsBottomSheetRef?.current?.open();
	}, [settingsBottomSheetRef]);

	const fetchProfilePicture = useCallback((token: string) => {
		FoundationClient.CheckAuthentication(token).then(async (res) => {
			const { successful, user }: CheckAuthenticationPayload =
				await res.json();
			if (!successful) return;

			const url = user.profilePictureUrl;
			setProfilePicture(url);
		});
	}, []);

	const uploadProfilePicture = useCallback(async () => {
		const imageResult = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});

		if (imageResult.canceled || !token) return;

		const imageAsset = imageResult.assets[0];

		try {
			const res = await FoundationClient.UploadAvatar(token, {
				uri: imageAsset.uri,
				type: mime.lookup(imageAsset.uri) || undefined,
				name: imageAsset.uri.split('/').pop() || '',
			});

			if (res.status != 200) {
				alert('Failed to upload profile picture.');
				console.log(res.status + ': ' + res.body);
				console.log(res);
				return;
			}

			const result = await res.json();

			if (!result.successful) {
				alert('Failed to upload profile picture.');
				console.log(result);
				console.log(res.status + ': ' + res.body);
				return;
			}

			setProfilePicture(imageAsset.uri);
			setReloadKey(Date.now());
			alert('Successfully uploaded profile picture!');

			setTimeout(() => {
				if (token) fetchProfilePicture(token);
			}, 1000);
		} catch (e) {
			console.log(e);
		}
	}, []);

	useEffect(() => {
		if (!token) return;

		fetchProfilePicture(token);
	}, [token]);

	return (
		<>
			<TouchableOpacity containerStyle={containerStyle} onPress={onPress}>
				<Image
					key={reloadKey}
					cachePolicy={'none'}
					source={profilePicture}
					transition={200}
					placeholder={'#00000099'}
					style={[
						{
							aspectRatio: 1,
							borderRadius: 1000,
							height: 'auto',
							width: 'auto',
						},
						style,
					]}
					{...rest}
				/>
			</TouchableOpacity>
			<BottomSheet
				ref={settingsBottomSheetRef}
				activeHeight={height * 0.5}
				dismissDistance={10}
				containerStyle={{
					alignItems: 'center',
					display: 'flex',
					gap: 8 * Spacings.Unit,
				}}
			>
				<CustomButton
					text='Change Profile Picture'
					onPress={() => {
						uploadProfilePicture();
					}}
					buttonStyle={{ backgroundColor: '#0000', width: '100%' }}
					textStyle={{ color: '#000' }}
				/>
				<CustomButton
					text='Remove Profile Picture'
					onPress={() => {}}
					buttonStyle={{ backgroundColor: '#0000', width: '100%' }}
					textStyle={{ color: '#000' }}
				/>
				<CustomButton
					text='Log Out'
					onPress={() => {}}
					buttonStyle={{ backgroundColor: '#0000', width: '100%' }}
					textStyle={{ color: '#000' }}
				/>
			</BottomSheet>
		</>
	);
};

export default Component;
