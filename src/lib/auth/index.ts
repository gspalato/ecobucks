import SecureStore from 'expo-secure-store';

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

export default TokenHandler;