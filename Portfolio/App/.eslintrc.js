module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: 'airbnb',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'indent': [2, 'tab', {'ignoredNodes': ['JSXElement']}],
    'linebreak-style': 0,
    'lines-between-class-members': 0,
    'max-len': ["error", { "code": 120 }],
    'no-prototype-builtins': 0,
    'no-tabs': 0,
    'react/destructuring-assignment': 0,
    'react/jsx-filename-extension': [2, { 'extensions': ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/jsx-indent': [2,'tab', {indentLogicalExpressions: true}],
    'react/no-unescaped-entities': 0,
  },
  settings: {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
};
