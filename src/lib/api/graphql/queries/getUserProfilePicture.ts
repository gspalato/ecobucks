import { gql } from '@apollo/client';

import { CheckAuthenticationPayload } from '@/types/CheckAuthenticationPayload';

export const Query = gql`
	query ($token: String!) {
		checkAuthentication(token: $token) {
			successful
			user {
				profilePictureUrl
			}
		}
	}
`;

export type ReturnType = { checkAuthentication: CheckAuthenticationPayload };
