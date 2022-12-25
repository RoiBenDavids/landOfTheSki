module.exports = {
    env: {
        node: true,
        commonjs: true,
        es6: true,
    },
    extends: ['plugin:import/recommended', 'eslint:recommended', 'prettier'],
    plugins: ['prettier', 'import', 'jest'],
    globals: {},
    parser: '@babel/eslint-parser',
    parserOptions: {
        ecmaVersion: 2020,
        requireConfigFile: false,
        babelOptions: {
            plugins: ['@babel/plugin-syntax-import-assertions'],
        },
    },
    rules: {
        'no-nested-ternary': 'error',
        'no-unneeded-ternary': ['error', {defaultAssignment: false}],
        'no-unused-vars': 'warn',
        'no-mixed-operators': [
            'error',
            {
                groups: [
                    ['&&', '||'],
                    ['in', 'instanceof'],
                ],
                allowSamePrecedence: true,
            },
        ],
        complexity: ['warn', 6],
        'max-lines-per-function': ['warn', 30],
        'max-params': ['warn', 6],
        'import/extensions': ['error', 'ignorePackages'],
    },
    settings: {
        'import/resolver': {
            node: {
                paths: ['.'],
            },
            alias: [
                ['#services', './services'],
                ['#common', './common'],
            ],
        },
    },
}
