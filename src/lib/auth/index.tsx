import * as SecureStore from 'expo-secure-store';
import React, {
	createContext,
	PropsWithChildren,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';

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

export {
	AuthProvider,
	useAuth,
	useAuthToken,
	useExpireAuthToken,
	useSetAuthToken,
};
