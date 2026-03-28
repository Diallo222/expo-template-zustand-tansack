import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { Text, View } from 'react-native';

import { Button, Input } from '@/components/common';
import { Screen } from '@/components/ui';
import { useLoginMutation } from '@/features/auth/queries/useLoginMutation';
import { loginRequestSchema, type LoginRequest } from '@/features/auth/types';

function getErrorMessage(err: unknown): string {
  if (isAxiosError(err)) {
    const data = err.response?.data;
    if (data != null && typeof data === 'object' && 'error' in data) {
      const e = (data as { error?: unknown }).error;
      if (typeof e === 'string' && e.length > 0) {
        return e;
      }
    }
    if (typeof err.message === 'string' && err.message.length > 0) {
      return err.message;
    }
  }
  return 'Sign-in failed. Check credentials and try again.';
}

/**
 * Example screen: react-hook-form + Zod + TanStack mutation + Zustand session (via mutation onSuccess).
 * `Controller` wires RN `TextInput` (`onChangeText`) to RHF reliably.
 */
export function LoginScreen() {
  const router = useRouter();
  const loginMutation = useLoginMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: zodResolver(loginRequestSchema),
    mode: 'onBlur',
    defaultValues: {
      email: 'eve.holt@reqres.in',
      password: 'cityslicka',
    },
  });

  const onSubmit = handleSubmit((values) => {
    loginMutation.mutate(values, {
      onSuccess: () => {
        router.replace('/products');
      },
    });
  });

  const mutationError =
    loginMutation.isError && loginMutation.error ? getErrorMessage(loginMutation.error) : null;

  return (
    <Screen>
      <View className="flex-1 justify-center py-8">
        <Text className="mb-1 text-2xl font-bold text-neutral-900 dark:text-white">Sign in</Text>
        <Text className="mb-8 text-sm text-neutral-500 dark:text-neutral-400">
          Demo API (reqres.in): use the default email/password or your own reqres account.
        </Text>

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Input
              label="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              ref={ref}
              error={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Input
              label="Password"
              secureTextEntry
              autoComplete="password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              ref={ref}
              error={errors.password?.message}
            />
          )}
        />

        {mutationError ? (
          <Text className="mb-4 text-sm text-red-600 dark:text-red-400">{mutationError}</Text>
        ) : null}

        <Button onPress={onSubmit} loading={loginMutation.isPending}>
          Continue
        </Button>
      </View>
    </Screen>
  );
}
