import { gql } from '@apollo/client';

import { UploadProfilePicturePayload } from '@/types/UploadProfilePicturePayload';

export const Mutation = gql`
	mutation ($file: Upload!, $token: String!) {
		uploadProfilePicture(file: $file, token: $token) {
			successful
			error
		}
	}
`;

export type ReturnType = {
	uploadProfilePicture: UploadProfilePicturePayload;
};
