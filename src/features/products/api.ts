import { httpClient } from '@/lib/api/httpClient';

import { productsResponseSchema } from './types';

const PRODUCTS_URL = 'https://fakestoreapi.com/products';

/** Public catalog — uses absolute URL so it is independent of `EXPO_PUBLIC_API_URL`. */
export async function fetchProducts() {
  const { data } = await httpClient.get<unknown>(PRODUCTS_URL);
  return productsResponseSchema.parse(data);
}
