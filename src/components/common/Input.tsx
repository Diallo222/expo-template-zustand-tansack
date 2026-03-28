import { forwardRef, memo } from 'react';
import { Text, TextInput, type TextInputProps, View } from 'react-native';

type InputProps = TextInputProps & {
  label: string;
  error?: string;
};

export const Input = memo(
  forwardRef<TextInput, InputProps>(function Input({ label, error, className, ...rest }, ref) {
    return (
      <View className="mb-4">
        <Text className="mb-1 text-sm font-medium text-neutral-800 dark:text-neutral-200">{label}</Text>
        <TextInput
          ref={ref}
          placeholderTextColor="#9ca3af"
          className={`rounded-lg border border-neutral-300 bg-white px-3 py-3 text-base text-neutral-900 dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-100 ${className ?? ''}`}
          {...rest}
        />
        {error ? <Text className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</Text> : null}
      </View>
    );
  }),
);
