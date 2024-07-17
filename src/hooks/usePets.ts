import { create } from 'zustand'

import IPet from '@/interfaces/IPet'

interface PetsState {
  pets: IPet[]
  petsSearch: IPet[]
  setPets: (pets: IPet[]) => void
  getPetById: (id: string) => IPet | undefined
  removePet: (id: string) => void
  searchPets: (search: string) => void
}

const usePets = create<PetsState>()((set, get) => ({
  pets: [],
  petsSearch: [],
  setPets: (pets) => set({ pets, petsSearch: pets }),
  getPetById: (id) => get().petsSearch.find((pet) => pet.id === id),
  removePet: (id) => {
    set((state) => ({
      pets: state.pets.filter((pet) => pet.id !== id),
    }))
  },
  searchPets: (search) => {
    if (search) {
      set((state) => ({
        petsSearch: state.petsSearch.filter((pet) =>
          pet.name.toLowerCase().includes(search.toLowerCase()),
        ),
      }))
    } else {
      set({ petsSearch: get().pets })
    }
  },
}))

export default usePets
