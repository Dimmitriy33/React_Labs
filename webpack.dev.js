/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require("webpack-merge");
// const webpack = require("webpack");

const common = require("./webpack.common");

module.exports = (env, argv) => {
  const commonConfig = common(env, argv);

  /** @type {import('webpack').Configuration} */
  const extendedConfig = {
    // plugins: [
    //   new webpack.DefinePlugin({
    //     // it adds custom Global definition to the project like BASE_URL for index.html
    //     "process.env": {
    //       ADMIN: "Admin123",
    //     },
    //   }),
    // ],
    mode: "development",
    devtool: "eval-cheap-module-source-map", // option controls how source maps are generated (affects on build speed dramatically): https://v4.webpack.js.org/configuration/devtool/
  };

  return merge(commonConfig, extendedConfig);
};
