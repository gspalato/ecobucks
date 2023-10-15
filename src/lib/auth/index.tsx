import {
	LazyQueryExecFunction,
	OperationVariables,
	useLazyQuery,
} from '@apollo/client';
import * as SecureStore from 'expo-secure-store';
import React, {
	createContext,
	PropsWithChildren,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';

import * as GetEcobucksProfile from '@lib/api/graphql/queries/getEcobucksProfile';

import { AuthenticationPayload } from '@/types/AuthenticationPayload';
import { CheckAuthenticationPayload } from '@/types/CheckAuthenticationPayload';
import { Profile } from '@/types/Profile';

import FoundationClient from '../api/client';

export type AuthState = {
	token: string | null;
	isLoggedIn: boolean;
	isLoading: boolean;
};
export type AuthStateAction = { type: AuthStateActionType; [key: string]: any };
export type AuthStateActionType =
	| 'LOGIN'
	| 'LOGOUT'
	| 'SET_TOKEN'
	| 'RESTORE_TOKEN'
	| 'SET_LOGGED_IN';

type AuthContextData = {
	login: (username: string, password: string) => Promise<boolean>;
	logout: () => void;
} & AuthState;

const AuthContext = createContext<AuthContextData>({} as any);
const useAuth = () => useContext(AuthContext);

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [state, dispatch] = React.useReducer(
		(prevState: AuthState, action: AuthStateAction) => {
			switch (action.type) {
				case 'SET_TOKEN':
					return {
						...prevState,
						token: action.token,
					};

				case 'RESTORE_TOKEN':
					return {
						...prevState,
						token: action.token,
						isLoading: false,
					};

				case 'SET_LOGGED_IN':
					return {
						...prevState,
						isLoggedIn: action.isLoggedIn,
					};

				case 'LOGIN':
					return {
						...prevState,
						isLoggedIn: true,
						token: action.token,
					};

				case 'LOGOUT':
					return {
						...prevState,
						isLoggedIn: false,
						token: null,
					};
			}
		},
		{
			isLoading: true,
			isLoggedIn: false,
			token: null,
		},
	);

	React.useEffect(() => {
		// Fetch the token from storage then navigate to our appropriate place
		const bootstrapAsync = async () => {
			let token;

			try {
				token = await SecureStore.getItemAsync('token');
			} catch (e) {
				// Restoring token failed
			}

			// After restoring token, we may need to validate it in production apps
			FoundationClient.CheckAuthentication(token!).then(async (res) => {
				const { successful }: CheckAuthenticationPayload =
					await res.json();

				dispatch({ type: 'SET_LOGGED_IN', isLoggedIn: successful });
			});

			// This will switch to the App screen or Auth screen and this loading
			// screen will be unmounted and thrown away.
			dispatch({ type: 'RESTORE_TOKEN', token: token });
		};

		bootstrapAsync();
	}, []);

	const authContext = React.useMemo(
		() => ({
			...state,
			login: async (
				username: string,
				password: string,
			): Promise<boolean> => {
				const response = await FoundationClient.Authenticate(
					username,
					password,
				);

				if (!response.ok) {
					alert(`Failed to login. Try again.`);
					console.log(response);
					return false;
				}

				const payload: AuthenticationPayload = await response.json();
				if (!payload.successful) {
					alert(`Failed to login. Try again.`);
					console.log(response);
					return false;
				}

				dispatch({ type: 'LOGIN', token: payload.token });

				return true;
			},
			logout: () => {
				SecureStore.deleteItemAsync('token');

				dispatch({ type: 'LOGOUT' });
			},
		}),
		[state],
	);

	return (
		<AuthContext.Provider value={authContext}>
			{children}
		</AuthContext.Provider>
	);
};

AuthProvider.displayName = 'AuthProvider';

const useSetAuthToken = (token: string) => {
	useEffect(() => {
		const setToken = async () => {
			await SecureStore.setItemAsync('token', token);
		};

		setToken();
	}, [token]);
};

const useAuthToken = (callback?: (token: string | null) => any) => {
	const [token, setToken] = useState<string | null>(null);
	useEffect(() => {
		const getToken = async () => {
			const token = await SecureStore.getItemAsync('token');
			setToken(token);
			callback?.(token);
		};

		getToken();
	}, []);

	return token;
};

const useExpireAuthToken = (callback?: () => void) => {
	useEffect(() => {
		const setToken = async () => {
			await SecureStore.deleteItemAsync('token');
			callback?.();
		};

		setToken();
	}, [callback]);
};

const useProfile = (
	token: string | null,
	callback?: (profile: Profile | null) => void,
): {
	profile: Profile | null;
	fetch: LazyQueryExecFunction<
		GetEcobucksProfile.ReturnType,
		OperationVariables
	>;
} => {
	const [profile, setProfile] = useState<Profile | null>(null);

	const [fetch] = useLazyQuery<GetEcobucksProfile.ReturnType>(
		GetEcobucksProfile.Query,
		{
			fetchPolicy: 'no-cache',
			onCompleted(data) {
				setProfile(data.ecobucksProfile);
				callback?.(data.ecobucksProfile);
			},
			onError(e) {
				alert(
					`Failed to fetch profile.\n${e.message}\n${
						e.cause
					}\n${e.graphQLErrors.map((e) => e.message)}`,
				);
				setProfile(null);
				callback?.(null);
			},
		},
	);

	useEffect(() => {
		if (!token) return;

		fetch({
			variables: {
				token,
			},
		});
	}, [token]);

	return { profile, fetch };
};

export {
	AuthProvider,
	useAuth,
	useAuthToken,
	useExpireAuthToken,
	useProfile,
	useSetAuthToken,
};
