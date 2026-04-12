import { z } from 'zod';

export const CategoryCode = z.enum([
  'coffee',
  'nature',
  'towns',
  'gastronomy',
  'culture',
  'viewpoints',
]);
export type CategoryCode = z.infer<typeof CategoryCode>;

export const CategoryId = z.string().uuid().brand<'CategoryId'>();
export type CategoryId = z.infer<typeof CategoryId>;

export const Category = z.object({
  id: CategoryId,
  name: z.string().min(1),
  code: CategoryCode,
  icon: z.string().nullable(),
  color: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/)
    .nullable(),
  createdAt: z.date(),
});

export type Category = z.infer<typeof Category>;
