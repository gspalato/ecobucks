import { TabRouter } from '@react-navigation/native';

const MyTabRouter = (options: any) => {
	const router = TabRouter(options);

	const getStateForAction = (state: any, action: any, options: any) => {
		switch (action.type) {
			case 'CLEAR_HISTORY':
				return {
					...state,
					routeKeyHistory: [],
				};
			default:
				return router.getStateForAction(state, action, options);
		}
	};

	const clearHistory = () => {
		return { type: 'CLEAR_HISTORY' };
	};

	return {
		...router,
		getStateForAction,

		actionCreators: {
			...router.actionCreators,
			clearHistory,
		},
	};
};
