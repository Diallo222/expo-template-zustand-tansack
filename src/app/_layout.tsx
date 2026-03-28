import 'react-native-gesture-handler';
import '../../global.css';

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Platform, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { queryClient } from '@/lib/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();

/**
 * Provider order (outer → inner): QueryClient → navigation theme → SafeArea → gestures → Stack.
 * Zustand stores do not require React providers.
 */
export default function RootLayout() {
  const [loaded, error] = useFonts({
    // Expo font bundling uses require(); path is relative to this file in src/app/
    // eslint-disable-next-line @typescript-eslint/no-require-imports -- asset module
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      {__DEV__ && Platform.OS === 'web' ? <ReactQueryDevtools initialIsOpen={false} /> : null}
      <RootLayoutNav />
    </QueryClientProvider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(drawer)" />
          </Stack>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
