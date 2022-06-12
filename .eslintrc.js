module.exports = {
	env: {
		es2021: true,
		'react-native/react-native': true,
	},
	extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react-native', '@typescript-eslint'],
	globals: {
		JSX: true,
	},
	settings: {
		'import/resolver': {
			alias: {
				map: [
					['@assets', './assets'],
					['@src', './src'],
					['@components', './src/components'],
					['@contexts', './src/contexts'],
					['@gql', './src/gql'],
					['@pages', './src/pages'],
					['@routes', './src/routes'],
					['@services', './src/services'],
					['@typings', './src/typings'],
				],
				extensions: ['.js', '.ts', '.tsx', '.jsx', '.json', '.vue'],
			},
		},
	},
	rules: {
		'import/extensions': [
			'error',
			'never',
			{
				js: 'never',
				ts: 'never',
			},
		],
		'max-classes-per-file': 'off',
		'class-methods-use-this': 'off',
		'no-underscore-dangle': ['error', { allow: ['_id'] }],
		'no-shadow': 'off',
		'@typescript-eslint/no-shadow': ['error', { ignoreTypeValueShadow: true }],
		'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.jsx'] }],
		'react/jsx-no-useless-fragment': 'off',
		camelcase: ['error', { ignoreDestructuring: true }],
		'no-use-before-define': [
			'error',
			{ functions: true, classes: true, variables: false },
		],
		'react-native/no-unused-styles': 2, // disallow unused styles
		// 'react-native/no-inline-styles': 2, // disallow styles declared within the component itself
		// 'react-native/no-color-literals': 2, // enforces variable names to be used for storing colors
		'react/function-component-definition': [
			2,
			{
				namedComponents: 'arrow-function',
				unnamedComponents: 'arrow-function',
			},
		],
		'react/jsx-no-bind': 'off',
		'no-param-reassign': ['error', { props: false }],
		'@typescript-eslint/no-unused-vars': 'error',
		'react/require-default-props': 'off',
	},
}
