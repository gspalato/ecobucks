import { gql } from '@apollo/client';

import { ClaimDisposalAndCreditsPayload } from '@/types/ClaimCreditsAndDisposalPayload';

export const Mutation = gql`
	mutation ClaimDisposalAndCredits(
		$userToken: String!
		$disposalToken: String!
	) {
		claimDisposalAndCredits(
			input: { userToken: $userToken, disposalToken: $disposalToken }
		) {
			successful
			error
			disposal {
				userId
				operatorId
				token
				credits
				isClaimed
				weight
				id
				disposals {
					credits
					weight
					disposalType
				}
			}
		}
	}
`;

export type ReturnType = {
	claimDisposalAndCredits: ClaimDisposalAndCreditsPayload;
};
