module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
        node: true,
    },
    extends: 'airbnb',
    overrides: [
        {
            env: {
                node: true,
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script',
            },
        },
    ],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    ignorePatterns: ['temp.js', '**/migrations/*.js'],
    rules: {
        indent: ['error', 4],
        'no-console': 'off', // "warn" // "off"
        'linebreak-style': 0,
    },
};
