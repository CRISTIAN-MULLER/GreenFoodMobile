module.exports = (api) => {
	api.cache(true)
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			'transform-inline-environment-variables',
			[
				'module-resolver',
				{
					alias: {
						'@assets': './assets',
						'@src': './src',
						'@components': './src/components',
						'@contexts': './src/contexts',
						'@gql': './src/gql',
						'@pages': './src/pages',
						'@routes': './src/routes',
						'@services': './src/services',
						'@typings': './src/typings',
					},
				},
			],
		],
	}
}
