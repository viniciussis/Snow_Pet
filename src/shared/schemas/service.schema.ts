import { z } from 'zod'

export const serviceSchema = z.object({
  totalValue: z.number().positive({ message: 'Número positivo' }),
  date: z.date(),
  customerId: z.string().min(1, { message: 'Campo obrigatório' }),
})

export type Service = z.infer<typeof serviceSchema>
