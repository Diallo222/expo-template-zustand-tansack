import type { ReactNode } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type ScreenProps = {
  children: ReactNode;
  className?: string;
};

/** Domain-agnostic safe-area wrapper for screens (NativeWind `className`). */
export function Screen({ children, className }: ScreenProps) {
  return (
    <SafeAreaView className={`flex-1 bg-white dark:bg-neutral-950 ${className ?? ''}`} edges={['top', 'left', 'right']}>
      <View className="flex-1 px-4">{children}</View>
    </SafeAreaView>
  );
}
