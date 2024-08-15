import { PetGender, PetSize, PetSpecie } from '../enums'
import { z } from 'zod'

export const petSchema = z.object({
  name: z.string().min(1, { message: 'Campo obrigatório' }),
  specie: z.nativeEnum(PetSpecie).or(z.string().max(0)),
  ownerId: z.string().or(z.string().max(0)),
  breed: z.string().min(1, { message: 'Campo obrigatório' }),
  size: z.nativeEnum(PetSize).or(z.string().max(0)),
  gender: z.nativeEnum(PetGender).or(z.string().max(0)),
  healthProblems: z.string().optional(),
  allergies: z.string().optional(),
  additionalInfo: z.string().optional(),
})

export type Pet = z.infer<typeof petSchema>
