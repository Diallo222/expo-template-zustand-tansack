import type { ReactNode } from 'react';
import { memo } from 'react';
import { ActivityIndicator, Pressable, Text } from 'react-native';

type ButtonProps = {
  onPress: () => void;
  children: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
};

export const Button = memo(function Button({
  onPress,
  children,
  disabled,
  loading,
  className,
}: ButtonProps) {
  const isDisabled = disabled || loading;
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={isDisabled}
      className={`rounded-xl bg-blue-600 px-4 py-3 active:opacity-80 dark:bg-blue-500 ${isDisabled ? 'opacity-50' : ''} ${className ?? ''}`}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text className="text-center text-base font-semibold text-white">{children}</Text>
      )}
    </Pressable>
  );
});
