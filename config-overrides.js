const webpack = require('webpack');

const isHMRPlugin = plugin =>
  Object.getPrototypeOf(plugin).isPrototypeOf(
    new webpack.HotModuleReplacementPlugin()
  );

// Adds worker-loader to beginning of the 'oneOf' section of the rules.
// Refer ./config/webpack.config.dev.js in ejected CRA
const addWorkerRule = rules => {
  let loaderConfig = rules.find(r => r.hasOwnProperty('oneOf'));

  // get "loader & options" for the rules defined for App related javascript files
  // From ./config/webpack.config.dev.js in ejected CRA
  let { loader, options } = loaderConfig.oneOf.find(
    rule => String(rule.test) === '/\\.(js|mjs|jsx|ts|tsx)$/'
  );

  const workerRule = {
    test: /\.worker\.js$/,
    use: [{ loader: 'worker-loader' }, { loader, options }]
  };

  loaderConfig.oneOf.unshift(workerRule);
};

module.exports = (config, env) => {
  addWorkerRule(config.module.rules);

  // Disabling HMR as worker-loader does not work when HMR is enabled
  config.plugins = config.plugins.filter(plugin => !isHMRPlugin(plugin));

  return config;
};
