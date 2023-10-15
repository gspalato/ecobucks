import { gql } from '@apollo/client';

import { ProfilePictureUploadUrlPayload } from '@/types/ProfilePictureUploadUrlPayload';

export const Query = gql`
	mutation ($token: String!) {
		profilePictureUploadUrl(token: $token) {
			successful
			url
			error
		}
	}
`;

export type ReturnType = {
	profilePictureUploadUrl: ProfilePictureUploadUrlPayload;
};
