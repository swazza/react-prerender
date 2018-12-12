const webpack = require('webpack');

const isHMRPlugin = plugin =>
  Object.getPrototypeOf(plugin).isPrototypeOf(
    new webpack.HotModuleReplacementPlugin()
  );

module.exports = (config, env) => {
  config.module.rules.push({
    test: /\.worker\.js$/,
    use: { loader: 'worker-loader' }
  });

  // Disabling HMR as worker-loader does not work when HMR is enabled
  config.plugins = config.plugins.filter(plugin => !isHMRPlugin(plugin));
  return config;
};
