const BaseUrl = 'http://192.168.0.108:4000/';
//const BaseUrl = 'https://foundation.unreal.sh/';

const getUrl = (...paths: string[]) => {
	let url = new URL(BaseUrl);
	paths.forEach((path) => (url = new URL(path, url)));
	return url.toString();
};

export const Endpoints = {
	REST: {
		Auth: getUrl('auth'),
		//Avatar: getUrl('identity/me/avatar'),

		EcobucksProfile: getUrl('me'),
		EcobucksDisposals: getUrl('me/disposals'),
		EcobucksStations: getUrl('stations'),
		EcobucksWebSocket: getUrl('ws'),
	},
};

export default Endpoints;
