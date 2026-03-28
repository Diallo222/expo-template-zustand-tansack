import { AppleMaps, GoogleMaps } from 'expo-maps';
import { Platform, Text, View, type StyleProp, type ViewStyle } from 'react-native';

type ExpoMapViewProps = {
  style?: StyleProp<ViewStyle>;
};

/**
 * Cross-platform map: Apple Maps on iOS, Google Maps on Android.
 * Web shows a placeholder. Requires a development build — not available in Expo Go.
 * @see https://docs.expo.dev/versions/latest/sdk/maps/
 */
export function ExpoMapView({ style }: ExpoMapViewProps) {
  if (Platform.OS === 'ios') {
    return <AppleMaps.View style={[{ flex: 1 }, style]} />;
  }
  if (Platform.OS === 'android') {
    return <GoogleMaps.View style={[{ flex: 1 }, style]} />;
  }
  return (
    <View className="flex-1 items-center justify-center bg-neutral-100 p-4 dark:bg-neutral-900">
      <Text className="text-center text-neutral-600 dark:text-neutral-400">
        Maps are available on Android and iOS in a development build.
      </Text>
    </View>
  );
}
