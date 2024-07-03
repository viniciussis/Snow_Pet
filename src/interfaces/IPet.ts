export default interface IPet {
  id?: string
  name: string
  ownerId?: string
  specie: string
  breed: string
  size: string
  gender: string
  healthProblems?: string
  allergies?: string
  additionalInfo?: string
  combo?: boolean
}
