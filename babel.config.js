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
						'@app': ['./src/app'],
						'@assets': ['./assets'],
						'@components': ['./src/components'],
						'@lib': ['./src/lib'],
						'@styles': ['./src/styles.ts'],
					},
				},
			],
			'react-native-reanimated/plugin',
		],
	};
};
