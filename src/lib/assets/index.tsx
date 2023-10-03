import { Asset } from 'expo-asset';
import { useMemo, useState } from 'react';

const useAssets = () => {
	const [promises, setPromises] = useState<Promise<void>[]>([]);

	const [loaded, setLoaded] = useState(false);

	const preload = (id: string | number) => {
		const promise = new Promise<void>((resolve, reject) => {
			Asset.fromModule(id)
				.downloadAsync()
				.then(() => {
					resolve();
				})
				.catch(() => {
					reject();
				});
		});

		setPromises((promises) => [...promises, promise]);
	};

	const wait = () => {
		Promise.all(promises).then(() => setLoaded(true));
	};

	return { loaded, preload, wait };
};

export default useAssets;
