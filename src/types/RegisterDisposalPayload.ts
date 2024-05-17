import { DisposalClaim } from './DisposalClaim';
import { Profile } from './Profile';

export type RegisterDisposalPayload = {
	success: boolean;
	disposal: DisposalClaim;
	error: string;
};
