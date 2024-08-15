import { PetSpecie, PetSize, PetGender } from '../enums'

export interface IPet {
  id?: string
  name: string
  specie: PetSpecie
  breed: string
  size: PetSize
  gender: PetGender
  healthProblems?: string
  allergies?: string
  additionalInfo?: string
  combo?: boolean
  ownerId?: string
  createdAt?: string
  updatedAt?: string
}
