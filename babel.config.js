module.exports = function (api) {
	api.cache(true);
	return {
		presets: ['babel-preset-expo'],
		plugins: [
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
			'expo-router/babel',
			'react-native-reanimated/plugin',
		],
	};
};
