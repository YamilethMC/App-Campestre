const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

config.resolver.sourceExts = [...config.resolver.sourceExts, 'mjs', 'cjs', 'css'];

config.resolver.resolveRequest = (context, moduleName, platform) => {
  // Handle @ path aliases
  if (moduleName.startsWith('@/')) {
    const relativePath = moduleName.substring(2); // Remove '@/'
    const absolutePath = path.resolve(__dirname, relativePath);
    
    // Try with different extensions
    const extensions = ['.tsx', '.ts', '.jsx', '.js', '.json'];
    for (const ext of extensions) {
      const filePath = absolutePath + ext;
      const fs = require('fs');
      if (fs.existsSync(filePath)) {
        return {
          filePath,
          type: 'sourceFile',
        };
      }
    }
    
    // Try as directory with index file
    for (const ext of extensions) {
      const filePath = path.join(absolutePath, 'index' + ext);
      const fs = require('fs');
      if (fs.existsSync(filePath)) {
        return {
          filePath,
          type: 'sourceFile',
        };
      }
    }
  }
  
  if (platform === 'web') {
    if (moduleName === 'react-native-worklets') {
      return {
        filePath: path.resolve(__dirname, 'worklets-mock.js'),
        type: 'sourceFile',
      };
    }
    if (moduleName === 'react-native-reanimated') {
      return {
        filePath: path.resolve(__dirname, 'reanimated-mock.js'),
        type: 'sourceFile',
      };
    }
  }
  
  return context.resolveRequest(context, moduleName, platform);
};

// Polyfill for import.meta
config.serializer = {
  ...config.serializer,
  getPolyfills: () => [
    path.resolve(__dirname, 'import-meta-polyfill.js')
  ]
};

config.transformer = {
  ...config.transformer,
  unstable_allowRequireContext: true,
  getTransformOptions: async () => ({
    transform: {
      experimentalImportSupport: false,
      inlineRequires: true,
    },
  }),
};

module.exports = config;
