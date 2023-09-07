import { gql } from '@apollo/client';

import { DisposalClaim } from '@/types/DisposalClaim';

export const Mutation = gql`
	mutation RegisterDisposal($input: RegisterDisposalInput!) {
		registerDisposal(input: $input) {
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
