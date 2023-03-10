module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./src"],
        extensions: [".js", ".jsx", ".ts", ".tsx", ".png"],
        alias: {
          "@components": "./src/components",
          "@assets": "./assets",
          "@config": "./src/config",
          "@screens": "./src/screens",
          "@services": "./src/services",
          "@interfaces": "./src/interfaces",
          "@hooks": "./src/hooks",
          "@mocks": "./src/mocks",
          "@routes": "./src/routes",
          "@functions": "./src/functions",
          "@themes": "./src/themes",
          "@utils": "./src/utils",
          "@views": "./src/views",
        },
      },
    ],
    "react-native-reanimated/plugin",
  ],
};
