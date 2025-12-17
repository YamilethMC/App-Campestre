const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');
const fs = require('fs');

const config = getDefaultConfig(__dirname);

// Add support for additional source extensions
config.resolver.sourceExts = [...config.resolver.sourceExts, 'mjs', 'cjs', 'css'];

// Configure resolver with custom logic
config.resolver.resolveRequest = (context, moduleName, platform) => {
  // Handle web-specific mocks first
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

  // Handle @ path aliases - resolve from project root
  if (moduleName.startsWith('@/')) {
    const relativePath = moduleName.substring(2); // Remove '@/'
    const absolutePath = path.resolve(__dirname, relativePath);
    
    // First check if file exists as-is (for assets with extensions like .png)
    if (fs.existsSync(absolutePath)) {
      return {
        filePath: absolutePath,
        type: 'sourceFile',
      };
    }
    
    // Check with code file extensions
    const codeExtensions = ['.tsx', '.ts', '.jsx', '.js', '.json'];
    
    // Try as file with extension
    for (const ext of codeExtensions) {
      const filePath = absolutePath + ext;
      if (fs.existsSync(filePath)) {
        return {
          filePath,
          type: 'sourceFile',
        };
      }
    }
    
    // Try as directory with index file
    for (const ext of codeExtensions) {
      const filePath = path.join(absolutePath, 'index' + ext);
      if (fs.existsSync(filePath)) {
        return {
          filePath,
          type: 'sourceFile',
        };
      }
    }
    
    // If still not found, throw descriptive error
    throw new Error(
      `Unable to resolve module ${moduleName}. Tried:\n` +
      `  - ${absolutePath} (as-is)\n` +
      `  - ${absolutePath} with extensions: ${codeExtensions.join(', ')}\n` +
      `  - ${absolutePath}/index with extensions: ${codeExtensions.join(', ')}`
    );
  }

  // Use default resolver for everything else
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
