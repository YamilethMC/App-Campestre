const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const path = require('path');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      babel: {
        dangerouslyAddModulePathsToTranspile: ['@react-navigation']
      }
    },
    argv
  );

  // Add path alias resolution for @/ imports
  config.resolve.alias = {
    ...config.resolve.alias,
    '@': path.resolve(__dirname, './'),
  };

  return config;
};
