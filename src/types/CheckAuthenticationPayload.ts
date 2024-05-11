import { User } from './User';

export type CheckAuthenticationPayload = {
	success: boolean;
	user: User;
};
