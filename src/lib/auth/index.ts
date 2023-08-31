import * as SecureStore from 'expo-secure-store';
import { useEffect } from 'react';

class TokenHandler { 
    static async setToken(token: string): Promise<void> {
        try {
            await SecureStore.setItemAsync('token', token);
        } catch (error) {
            console.error(error);
        }
    }
    
    static async getToken(): Promise<string | null> {
        try {
            return await SecureStore.getItemAsync('token');
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

const useSetAuthToken = (token: string) => {
    useEffect(() => {
        const setToken = async () => {
            await SecureStore.setItemAsync('token', token);
        };

        setToken();
    }, [token]);
}

const useAuthToken = (callback: (token: string | null) => void) => {
    useEffect(() => {
        const getToken = async () => {
            const token = await SecureStore.getItemAsync('token')
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
}

export { useAuthToken, useExpireAuthToken, useSetAuthToken };