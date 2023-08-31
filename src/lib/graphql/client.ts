import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

import Constants from '../../constants';

const ApiLink = new HttpLink({ uri: Constants.GATEWAY_URL });

export const useFoundationClient = () => {
	const client = new ApolloClient({
		link: ApiLink,
		cache: new InMemoryCache(),
	});

	return client;
};

const Client = new ApolloClient({
	link: ApiLink,
	cache: new InMemoryCache(),
});

export default Client;
