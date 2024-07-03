import { create } from 'zustand'

import IGrooming from '@/interfaces/IGrooming'

interface GroomingsStore {
  groomings: IGrooming[]
  setGroomings: (groomings: IGrooming[]) => void
  getGroomingById: (id: string) => IGrooming | undefined
  removeGrooming: (id: string) => void
}

const useGroomings = create<GroomingsStore>()((set, get) => ({
  groomings: [],
  setGroomings: (groomings) => set({ groomings }),
  getGroomingById: (id) =>
    get().groomings.find((grooming) => grooming.id === id),
  removeGrooming: (id) =>
    set((state) => ({
      groomings: state.groomings.filter((grooming) => grooming.id !== id),
    })),
}))

export default useGroomings
