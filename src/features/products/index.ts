/**
 * Public API for the products feature.
 */
export { fetchProducts } from './api';
export { useProductsQuery, productsQueryKey } from './queries/useProductsQuery';
export { ProductListScreen } from './screens/ProductListScreen';
export type { Product } from './types';
export { productSchema, productsResponseSchema } from './types';
