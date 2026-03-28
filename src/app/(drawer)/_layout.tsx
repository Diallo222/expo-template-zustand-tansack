import { Drawer } from 'expo-router/drawer';
import { Redirect, useRouter } from 'expo-router';
import { Pressable, Text } from 'react-native';

import { selectIsAuthenticated, useAuthStore } from '@/features/auth/store';
import { useAuthPersistHydration } from '@/hooks/usePersistHydration';

export default function DrawerLayout() {
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);
  const hydrated = useAuthPersistHydration();
  const isAuthed = useAuthStore(selectIsAuthenticated);

  if (!hydrated) {
    return null;
  }

  if (!isAuthed) {
    return <Redirect href="/login" />;
  }

  return (
    <Drawer
      screenOptions={{
        headerRight: () => (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Log out"
            onPress={() => {
              logout();
              router.replace('/');
            }}
            className="mr-3 rounded px-2 py-1 active:opacity-70"
          >
            <Text className="text-base font-medium text-blue-600 dark:text-blue-400">Log out</Text>
          </Pressable>
        ),
      }}
    >
      <Drawer.Screen
        name="products"
        options={{
          title: 'Products',
          drawerLabel: 'Products',
        }}
      />
    </Drawer>
  );
}
