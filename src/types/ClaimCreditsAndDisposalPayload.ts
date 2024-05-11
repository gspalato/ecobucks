import { DisposalClaim } from './DisposalClaim';

export type ClaimDisposalAndCreditsPayload = {
	success: boolean;
	error: string;
	disposal: DisposalClaim;
};
