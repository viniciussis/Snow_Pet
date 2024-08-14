interface Option {
  value: string
  label: string
}

interface PetOption {
  GENDER: Option[]
  SPECIE: Option[]
  SIZE: Option[]
}

export const PET_OPTIONS = {
  GENDER: [
    {
      value: 'MACHO',
      label: 'Macho',
    },
    {
      value: 'FEMEA',
      label: 'Fêmea',
    },
  ],
  SPECIE: [
    {
      value: 'CACHORRO',
      label: 'Cachorro',
    },
    {
      value: 'GATO',
      label: 'Gato',
    },
    {
      value: 'PASSARO',
      label: 'Pássaro',
    },
    {
      value: 'PEIXE',
      label: 'Peixe',
    },
    {
      value: 'REPTIL',
      label: 'Réptil',
    },
  ],
  SIZE: [
    {
      value: 'PEQUENO',
      label: 'Pequeno',
    },
    {
      value: 'MEDIO',
      label: 'Médio',
    },
    {
      value: 'GRANDE',
      label: 'Grande',
    },
  ],
} as const satisfies PetOption
