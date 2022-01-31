module.exports = {
  env: {
    browser: true,
    // es2021: true,
    node: true
  },
  extends: ['plugin:react/recommended', 'standard', 'eslint:recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    warnOnUnsupportedTypeScriptVersion: false
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/display-name': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/no-children-prop': 'off',
    'space-before-function-paren': 'off',
    'no-undef': 'off',
    'multiline-ternary': 'off'
  },
  settings: {
    react: {
      version: "latest"
    }
  }
}
