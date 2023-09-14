import { gql } from '@apollo/client';

import { Profile } from '@/types/Profile';

export const Query = gql`
	query ($token: String!) {
		ecobucksProfile(token: $token) {
			id
			name
			username
			credits
			isOperator
			transactions {
				claimId
				credits
				description
			}
		}
	}
`;

export type ReturnType = { ecobucksProfile: Profile };
