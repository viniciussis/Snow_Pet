import { IColumn, IPet } from '../interfaces'

export const PET_COLUMNS: IColumn<IPet>[] = [
  { id: 'name', label: 'Nome', minWidth: 50 },
  { id: 'specie', label: 'Espécie', align: 'center', minWidth: 50 },
  { id: 'breed', label: 'Raça', align: 'center', minWidth: 75 },
  { id: 'size', label: 'Porte', align: 'center', minWidth: 50 },
  { id: 'gender', label: 'Sexo', align: 'center', minWidth: 50 },
  {
    id: 'healthProblems',
    label: 'Problemas de Saúde',
    align: 'center',
    minWidth: 100,
  },
  { id: 'allergies', label: 'Alergias', align: 'center', minWidth: 75 },
  {
    id: 'additionalInfo',
    label: 'Informações Adicionais',
    align: 'center',
    minWidth: 100,
  },
]

interface Option {
  value: string
  label: string
}

interface PetTypes {
  GENDER: Option[]
  SPECIE: Option[]
  SIZE: Option[]
}

export const PET_TYPES = {
  GENDER: [
    { value: 'MACHO', label: 'Macho' },
    { value: 'FEMEA', label: 'Fêmea' },
  ] as const,
  SPECIE: [
    { value: 'CACHORRO', label: 'Cachorro' },
    { value: 'GATO', label: 'Gato' },
    { value: 'PASSARO', label: 'Pássaro' },
    { value: 'PEIXE', label: 'Peixe' },
    { value: 'REPTIL', label: 'Réptil' },
  ] as const,
  SIZE: [
    { value: 'PEQUENO', label: 'Pequeno' },
    { value: 'MEDIO', label: 'Médio' },
    { value: 'GRANDE', label: 'Grande' },
  ] as const,
} as const satisfies PetTypes
