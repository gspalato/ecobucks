import { gql } from '@apollo/client';

import { DisposalClaim } from '@/types/DisposalClaim';

export const Mutation = gql`
	mutation RegisterDisposal(
		$operatorToken: String!
		$disposals: [DisposalInput!]!
	) {
		registerDisposal(
			input: { operatorToken: $operatorToken, disposals: $disposals }
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
	registerDisposal: {
		successful: boolean;
		error: string;
		disposal: DisposalClaim;
	};
};
