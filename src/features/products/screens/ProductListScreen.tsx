import { FlashList } from '@shopify/flash-list';
import { Image } from 'expo-image';
import { memo, useCallback } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

import { Screen } from '@/components/ui';
import { useProductsQuery } from '@/features/products/queries/useProductsQuery';
import type { Product } from '@/features/products/types';

type ProductRowProps = {
  item: Product;
};

const ProductRow = memo(function ProductRow({ item }: ProductRowProps) {
  return (
    <View className="mb-3 flex-row items-center gap-3 rounded-xl border border-neutral-200 bg-white p-3 dark:border-neutral-700 dark:bg-neutral-900">
      <Image
        source={{ uri: item.image }}
        style={{ width: 72, height: 72, borderRadius: 8 }}
        contentFit="cover"
        transition={200}
        cachePolicy="memory-disk"
        accessibilityLabel={item.title}
      />
      <View className="min-w-0 flex-1">
        <Text className="text-base font-semibold text-neutral-900 dark:text-white" numberOfLines={2}>
          {item.title}
        </Text>
        <Text className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">${item.price.toFixed(2)}</Text>
      </View>
    </View>
  );
});

const keyExtractor = (item: Product) => String(item.id);

/**
 * Demonstrates TanStack Query + FlashList + expo-image + memoized rows.
 */
export function ProductListScreen() {
  const { data, isPending, isError, error, refetch, isRefetching } = useProductsQuery();

  const renderItem = useCallback(({ item }: { item: Product }) => <ProductRow item={item} />, []);

  if (isPending) {
    return (
      <Screen>
        <View className="flex-1 items-center justify-center py-12">
          <ActivityIndicator size="large" />
          <Text className="mt-3 text-neutral-500 dark:text-neutral-400">Loading products…</Text>
        </View>
      </Screen>
    );
  }

  if (isError || !data) {
    return (
      <Screen>
        <View className="flex-1 items-center justify-center py-12">
          <Text className="mb-4 text-center text-red-600 dark:text-red-400">
            {error instanceof Error ? error.message : 'Could not load products.'}
          </Text>
          <Text className="text-blue-600 dark:text-blue-400" onPress={() => refetch()}>
            Tap to retry
          </Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <Text className="mb-3 text-xl font-bold text-neutral-900 dark:text-white">Products</Text>
      {isRefetching ? (
        <Text className="mb-2 text-xs text-neutral-500 dark:text-neutral-400">Refreshing…</Text>
      ) : null}
      <View className="min-h-0 flex-1">
        <FlashList
          data={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onRefresh={() => refetch()}
          refreshing={isRefetching}
        />
      </View>
    </Screen>
  );
}
