module.exports = function (api) {
  api.cache.using(() => process.env.NODE_ENV)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          safe: false,
          allowUndefined: false
        }
      ],
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            tests: ['./tests/'],
            '@constants': './src/constants'
          }
        }
      ]
    ]
  }
}
