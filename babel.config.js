module.exports = function (api) {
	api.cache(true);
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			// Required for expo-router
			'expo-router/babel',
			'@babel/plugin-proposal-export-namespace-from',
			[
				'module-resolver',
				{
					alias: {
						'@': ['./src'],
						'@assets': ['./assets'],
						'@screens': ['./src/screens'],
						'@components': ['./src/components'],
						'@lib': ['./src/lib'],
					},
				},
			],
			'react-native-reanimated/plugin',
		],
	};
};
