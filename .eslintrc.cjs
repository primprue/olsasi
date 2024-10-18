

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    //  "plugin:prettier/recommended",
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    // 'eslint-config-prettier'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  // ["prettier"],
  rules: {
    //  "prettier/prettier": "error",  // Muestra errores cuando el código no sigue las reglas de Prettier
    "no-unused-vars": "off",// Otras reglas de ESLint
    "react/prop-types": "off",
    "react-refresh/only-export-components": "off",
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
