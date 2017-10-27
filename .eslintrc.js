module.exports = {
	root: true,
	
	env: {
		jest: true,
		es6: true,
		node: true,
	},
	
	parser: 'babel-eslint',
	
	parserOptions: {
		ecmaVersion: 6,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
	
	extends: [
		'eslint:recommended',
		'plugin:import/errors',
		'plugin:import/warnings',
		'plugin:react/recommended',
	],
	
	plugins: [
		'react',
		'jsx-a11y',
		'import',
	],
	
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.json']
			}
		},
		
		'import/extensions': [
			'.js',
			'.jsx',
		],
	},
	
	rules: {
		'linebreak-style': 0,
		'semi': [ 1, 'never' ],
		'comma-dangle': [1, {
			'arrays': 'always-multiline',
			'objects': 'always-multiline',
			'imports': 'always-multiline',
			'exports': 'always-multiline',
			'functions': 'always-multiline',
		}],
		'indent': [ 1, 'tab', {
			'SwitchCase': 1,
			'FunctionDeclaration': {
				'body': 1,
				'parameters': 2,
			},
			'CallExpression': { 'arguments': 2 },
			'MemberExpression': 2,
		} ],
		'no-tabs': 0,
		'spaced-comment': 0,
		'no-trailing-spaces': [ 1, { 'skipBlankLines': true } ],
		'jsx-quotes': [ 1, 'prefer-single' ],
		'arrow-parens': 0,
		'keyword-spacing': [ 1, {
			'after': false,
			'overrides': {
				'import': { 'after': true },
				'from': { 'after': true },
				'return': { 'after': true },
				'const': { 'after': true },
				'let': { 'after': true },
				'else': { 'after': true },
			},
		} ],
		'import/no-extraneous-dependencies': [ 'error', { 'devDependencies': [ '**/*.test.js?(x)' ] } ],
		'react/jsx-indent': 0,
		'react/jsx-curly-spacing': [ 1, 'always' ],
		'react/jsx-wrap-multilines': 0,
	},
}
