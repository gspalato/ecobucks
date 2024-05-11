import { Profile } from './Profile';

export type AuthenticationPayload = {
	user: Profile;
	token: string;
	error: string;
};
