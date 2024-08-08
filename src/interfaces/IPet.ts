import { PetGender } from '@/shared/enums/PetGender'
import { PetSpecie } from '@/shared/enums/PetSpecie'
import { PetSize } from '@/shared/enums/PetSize'

export default interface IPet {
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
