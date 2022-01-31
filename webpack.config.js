const createExpoWebpackConfigAsync = require('@expo/webpack-config')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv)

  // Use the React refresh plugin in development mode
  if (env.mode === 'development') {
    config.plugins.push(new ReactRefreshWebpackPlugin())
  }
  // if (env.mode === 'production') {
  //   config.plugins.push(
  //     new BundleAnalyzerPlugin({
  //       path: 'web-report'
  //     })
  //   )
  // }

  return config
}
