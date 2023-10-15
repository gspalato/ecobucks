const BaseUrl = 'http://3.223.11.90/api';

export const Endpoints = {
	GraphQL: {
		Gateway: BaseUrl,

		Identity: new URL('/identity/gql', BaseUrl).toString(),
		UPx: new URL('/upx/gql', BaseUrl).toString(),
	},

	REST: {
		Identity: new URL('/identity', BaseUrl).toString(),
		UPx: new URL('/upx', BaseUrl).toString(),

		Auth: new URL('/identity/auth', BaseUrl).toString(),
		Avatar: new URL('/identity/user/avatar', BaseUrl).toString(),
	},
};

export default Endpoints;
