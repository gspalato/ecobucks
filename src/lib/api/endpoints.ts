const BaseUrl = 'https://foundation.unreal.sh/';

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
		Avatar: new URL('/identity/me/avatar', BaseUrl).toString(),

		EcobucksProfile: new URL('/upx/ecobucks/me', BaseUrl).toString(),
	},
};

export default Endpoints;
