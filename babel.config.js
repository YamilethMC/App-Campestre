module.exports = function(api) {
  api.cache(true);
  const isWeb = process.env.EXPO_PLATFORM === 'web';
  
  return {
    presets: [
      ['babel-preset-expo', { 
        unstable_transformImportMeta: true 
      }]
    ],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './',
          },
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
        }
      ],
      ...(isWeb ? [] : ['react-native-reanimated/plugin']),
    ],
  };
};
