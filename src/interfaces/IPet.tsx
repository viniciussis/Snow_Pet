export default interface IPet {
  id: number
  name: string
  owner: string
  specie: string
  breed: string
  size: 'Pequeno' | 'Médio' | 'Grande'
  gender: 'Macho' | 'Fêmea'
  healthProblems: string
  allergies: string
  additionalInfo: string
}
