/**
 * Expo config — `newArchEnabled` enables Fabric + TurboModules (see Expo prebuild / build output).
 */
export default {
  name: 'expo-template-zustand-tansack',
  slug: 'expo-template-zustand-tansack',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'expotemplatezustandtansack',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  splash: {
    image: './assets/images/splash-icon.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      backgroundColor: '#E6F4FE',
      foregroundImage: './assets/images/android-icon-foreground.png',
      backgroundImage: './assets/images/android-icon-background.png',
      monochromeImage: './assets/images/android-icon-monochrome.png',
    },
    predictiveBackGestureEnabled: false,
  },
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './assets/images/favicon.png',
  },
  plugins: ['expo-router', 'expo-image', 'expo-secure-store'],
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
  extra: {
    eas: {
      projectId: process.env.EAS_PROJECT_ID,
    },
  },
};
