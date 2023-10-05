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

import * as GetEcobucksProfile from '@lib/graphql/queries/getEcobucksProfile';

import { Profile } from '@/types/Profile';

interface IAuthContextData {
	profile: Profile | null;
	setProfile: (profile: Profile | null) => void;
}

const AuthContext = createContext<IAuthContextData>({} as any);
const useAuth = () => useContext(AuthContext);

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [profile, setProfile] = useState<Profile | null>(null);

	const data = useMemo(
		() => ({
			profile,
			setProfile,
		}),
		[profile],
	);

	return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
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

const useAuthToken = (callback: (token: string | null) => void) => {
	useEffect(() => {
		const getToken = async () => {
			const token = await SecureStore.getItemAsync('token');
			callback(token);
		};

		getToken();
	}, [callback]);
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
