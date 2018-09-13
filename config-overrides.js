const rewireReactHotLoader = require('react-app-rewire-hot-loader');
const rewireBabelLoader = require("react-app-rewire-babel-loader");
const path = require("path");
const fs = require("fs");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

/* config-overrides.js */
module.exports = function override(config, env) {
    if (env === "development") {
        env.BROWSER = 'none';
    }
    if (env === "production") {
        console.log('production');
    }
    config = rewireReactHotLoader(config, env);

    //some modules are not es5 compatible and need to be included into the babel build
    config = rewireBabelLoader.include(
        config,
        resolveApp("node_modules/logform/"),
        resolveApp("node_modules/winston-transport/"),
        resolveApp("node_modules/winston/")
    );

    return config;
};
