import { create } from 'zustand'

import IPet from '@/interfaces/IPet'

interface PetsState {
  pets: IPet[]
  searchedPets: IPet[]
  setPets: (pets: IPet[]) => void
  getPetById: (id: string) => IPet | undefined
  removePet: (id: string) => void
  searchPets: (search: string) => void
}

const usePets = create<PetsState>()((set, get) => ({
  pets: [],
  searchedPets: [],
  setPets: (pets) => set({ pets, searchedPets: pets }),
  getPetById: (id) => get().pets.find((pet) => pet.id === id),
  removePet: (id) => {
    set((state) => ({
      pets: state.pets.filter((pet) => pet.id !== id),
    }))
  },
  searchPets: (search) => {
    if (search) {
      set((state) => ({
        searchedPets: state.searchedPets.filter((pet) =>
          pet.name.includes(search),
        ),
      }))
    } else {
      set({ searchedPets: get().pets })
    }
  },
}))

export default usePets
