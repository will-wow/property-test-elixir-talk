const path = require('path')

const rewireEslint = require("react-app-rewire-eslint");

function useEslintFromPackageJson(options) {
  // Use Eslint from package.json
  options.eslintPath = path.resolve(
    __dirname,
    "./node_modules/eslint/lib/api.js"
  );

  // Clear out extensions.
  delete options.baseConfig.extends;

  return options;
}

module.exports = function override(config, env) {
  // Eslint
  config = rewireEslint(config, env, useEslintFromPackageJson);

  // Raw load /code
  config.module.rules[1].oneOf.unshift({
    test: /code\//,
    use: "raw-loader",
    exclude: /node_modules/
  });

  return config;
};
