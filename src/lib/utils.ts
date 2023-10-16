import { useMemo } from 'react';

export const useRelativeTime = () => {
	return useMemo(() => {
		const hours = new Date().getHours();

		if (hours >= 5 && hours < 12) return 'morning';
		else if (hours >= 12 && hours < 17) return 'afternoon';
		else if (hours >= 17 || (hours >= 0 && hours < 5)) return 'evening';
	}, []);
};
