const rewireReactHotLoader = require('react-app-rewire-hot-loader');

/* config-overrides.js */
module.exports = function override (config, env) {
  if(env === "development") {
    env.BROWSER = 'none';
    console.log('development');
  }
  if(env === "production") {
    console.log('production');
  }
  config = rewireReactHotLoader(config, env);
  return config;
}
