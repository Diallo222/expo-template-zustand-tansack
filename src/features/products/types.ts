import { z } from 'zod';

/**
 * FakeStore API product shape — validate all remote payloads with Zod.
 * @see https://fakestoreapi.com/docs
 */
export const productSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  description: z.string(),
  category: z.string(),
  image: z.string().url(),
  rating: z
    .object({
      rate: z.number(),
      count: z.number(),
    })
    .optional(),
});

export type Product = z.infer<typeof productSchema>;

export const productsResponseSchema = z.array(productSchema);
