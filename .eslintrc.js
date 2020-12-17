module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'prettier',
    'plugin:node/recommended',
    'plugin:security/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2020,
  },
  plugins: ['prettier', 'security'],
  rules: {
    'comma-dangle': 0,
    'global-require': 'warn',
    'prettier/prettier': 'error',
    'operator-linebreak': ['warn', 'before'],
    'max-len': [
      'warn',
      {
        code: 80,
        ignoreStrings: true,
      },
    ],
    'new-cap': 0,
    'no-restricted-syntax': 'warn',
    'node/exports-style': ['warn', 'module.exports'],
    'node/file-extension-in-import': ['error', 'always'],
    'import/no-dynamic-require': 'warn',
    'no-process-exit': 'warn',
  },
};
