import { z } from 'zod'

export const groomingSchema = z.object({
  type: z.string().min(1, { message: 'Campo obrigatório' }),
  price: z.number().positive('Número positivo'),
  date: z.date(),
  petId: z.string().min(1, { message: 'Campo obrigatório' }),
})

export type Grooming = z.infer<typeof groomingSchema>
