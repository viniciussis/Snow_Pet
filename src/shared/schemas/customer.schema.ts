import { z } from 'zod'

export const customerSchema = z.object({
  name: z.string().min(1, { message: 'Campo obrigatório' }),
  socialMedia: z.string().optional(),
  email: z.string().email('Email inválido').or(z.string().max(0).nullable()),
  phoneNumber: z
    .string()
    .regex(
      /^(?:(?:\+|00)55\s?)?(?:\(?[1-9][0-9]\)?\s?)?(?:9[1-9][0-9]{3}-?[0-9]{4})$/,
      'Número inválido',
    ),
  address: z.object({
    neighborhood: z.string().min(1, { message: 'Campo obrigatório' }),
    houseNumber: z.string().min(1, { message: 'Campo obrigatório' }),
    street: z.string().min(1, { message: 'Campo obrigatório' }),
    complement: z.string().optional(),
  }),
})

export type Customer = z.infer<typeof customerSchema>
