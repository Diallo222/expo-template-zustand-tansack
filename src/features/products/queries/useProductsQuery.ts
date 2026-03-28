import { useQuery } from '@tanstack/react-query';

import { fetchProducts } from '@/features/products/api';

export const productsQueryKey = ['products', 'list'] as const;

export function useProductsQuery() {
  return useQuery({
    queryKey: productsQueryKey,
    queryFn: fetchProducts,
  });
}
