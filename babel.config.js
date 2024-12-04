module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      "babel-preset-expo", // Preset predeterminado para Expo, que maneja tanto web como móvil
    ],
    plugins: [["nativewind/babel"]],
  };
};
