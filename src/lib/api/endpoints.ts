//const BaseUrl = 'http://192.168.0.105:4000/';
const BaseUrl = 'https://foundation.unreal.sh/ecobucks/';

const getUrl = (...paths: string[]) => {
	let url = new URL(BaseUrl);
	paths.forEach((path) => (url = new URL(path, url)));
	return url.toString();
};

export const Endpoints = {
	REST: {
		Auth: 'https://foundation.unreal.sh/ecobucks/auth',

		Avatar: getUrl('me/avatar'),
		EcobucksProfile: getUrl('me'),
		EcobucksDisposals: getUrl('me/disposals'),
		EcobucksStations: getUrl('stations'),
		EcobucksWebSocket: getUrl('ws'),
	},
};

export default Endpoints;
