import { create } from 'zustand'

import IPet from '@/interfaces/IPet'

interface PetsState {
  pets: IPet[]
  setPets: (pets: IPet[]) => void
  getPetById: (id: string) => IPet | undefined
  removePet: (id: string) => void
}

const usePets = create<PetsState>()((set, get) => ({
  pets: [],
  setPets: (pets) => set({ pets }),
  getPetById: (id) => get().pets.find((pet) => pet.id === id),
  removePet: (id) => {
    set((state) => ({
      pets: state.pets.filter((pet) => pet.id !== id),
    }))
  },
}))

export default usePets
