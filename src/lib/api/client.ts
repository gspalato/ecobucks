import * as Location from 'expo-location';

import Endpoints from '@lib/api/endpoints';

import { Disposal } from '@/types/DisposalClaim';

export class FoundationClient {
	private static _websocket: WebSocket | null = null;
	private static _isLocationOn = false;
	private static _locationLoopTimeout: NodeJS.Timeout | null = null;

	public static Authenticate(
		username: string,
		password: string,
	): Promise<Response> {
		return fetch(Endpoints.REST.Auth, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username, password }),
		});
	}

	public static CheckAuthentication(token: string): Promise<Response> {
		return fetch(Endpoints.REST.Auth, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	}

	public static UploadAvatar(
		token: string,
		image: { uri: string; name?: string; type?: string },
	): Promise<Response> {
		const formData = new FormData();
		formData.append('file', image as any);

		return fetch(Endpoints.REST.Avatar, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: formData,
		});
	}

	public static DeleteAvatar(token: string): Promise<Response> {
		return fetch(Endpoints.REST.Avatar, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	}

	public static GetEcobucksProfile(token: string): Promise<Response> {
		return fetch(Endpoints.REST.EcobucksProfile, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	}

	public static RegisterDisposal(fields: Disposal[], token: string) {
		return fetch(Endpoints.REST.EcobucksDisposals, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ disposals: fields, operatorToken: token }),
		});
	}

	public static GetEcobucksStations(token: string) {
		return fetch(Endpoints.REST.EcobucksStations, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	}

	public static SendEcobucksStationLocation(
		latitude: number,
		longitude: number,
		timestamp: number,
		stationId: string,
		token: string,
	) {
		return fetch(Endpoints.REST.EcobucksStations, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				location: {
					latitude,
					longitude,
					timestamp,
					stationId,
				},
			}),
		});
	}

	public static RunLocationLoopAsync(stationId: string, token: string) {
		if (this._locationLoopTimeout) return;

		const sendLocation = async () => {
			console.log('Running location loop.');

			const permission = await Location.getForegroundPermissionsAsync();
			if (!permission.granted) {
				console.log('Location permission not granted.');
				return;
			}

			const location = await Location.getLastKnownPositionAsync();
			if (location === null) {
				console.log('No location found.');
				return;
			}

			const timestamp = Math.floor(new Date().getTime() / 1000);
			FoundationClient.SendEcobucksStationLocation(
				location.coords.latitude,
				location.coords.longitude,
				timestamp,
				stationId,
				token,
			);

			console.log(timestamp);

			console.log('Sent location payload.');
		};

		sendLocation();

		this._locationLoopTimeout = setInterval(sendLocation, 10 * 1000);
	}

	public static StopLocationLoop() {
		if (this._locationLoopTimeout) clearInterval(this._locationLoopTimeout);
	}
}

export default FoundationClient;
