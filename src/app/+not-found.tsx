import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Not found' }} />
      <View className="flex-1 items-center justify-center bg-white p-5 dark:bg-neutral-950">
        <Text className="mb-4 text-xl font-semibold text-neutral-900 dark:text-white">This screen does not exist.</Text>
        <Link href="/" className="text-base text-blue-600 dark:text-blue-400">
          Go home
        </Link>
      </View>
    </>
  );
}
