import { User } from './User';

export type CheckAuthenticationPayload = {
	successful: boolean;
	user: User;
};
