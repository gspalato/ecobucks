import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

import { useAuthToken } from '@/lib/auth';

import Endpoints from '../endpoints';

const ApiLink = createUploadLink({
	uri: Endpoints.GraphQL.UPx,
}) as any;

export const useFoundationClient = (endpoint?: string) => {
	const token = useAuthToken();

	return new ApolloClient({
		link: createUploadLink({
			uri: endpoint ?? Endpoints.GraphQL.UPx,
		}) as any,
		headers: {
			Authorization: `Bearer ${token}`,
		},
		cache: new InMemoryCache(),
	});
};

const Client = new ApolloClient({
	link: ApiLink,
	cache: new InMemoryCache(),
});

export default Client;
