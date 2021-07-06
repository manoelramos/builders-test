module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@components': './src/components',
          '@hooks': './src/hooks',
          '@stores': './src/stores',
          '@modules': './src/modules',
          '@theme': './src/theme',
          '@services': './src/services',
          '@animations': './src/animations',
          '@navigation': './src/navigation',
        },
      },
    ],
  ],
};
