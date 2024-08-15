import { z } from 'zod'

export const productSchema = z.object({
  name: z.string().min(1, { message: 'Campo obrigatório' }),
  brand: z.string().min(1, { message: 'Campo obrigatório' }),
  price: z.number().positive({ message: 'Número positivo' }),
  measure: z.string().min(1, { message: 'Campo obrigatório' }),
  categoryId: z.string().min(1, { message: 'Campo obrigatório' }),
  description: z.string().nullable(),
})

export type Product = z.infer<typeof productSchema>
