import { IGrooming } from '@/shared/interfaces'
import { create } from 'zustand'

interface GroomingsStore {
  groomings: IGrooming[]
  removeGrooming: (id: string) => void
  setGroomings: (groomings: IGrooming[]) => void
  getGroomingById: (id: string) => IGrooming | undefined
}

export const useGroomings = create<GroomingsStore>()((set, get) => ({
  groomings: [],
  setGroomings: (groomings) => set({ groomings }),
  getGroomingById: (id) =>
    get().groomings.find((grooming) => grooming.id === id),
  removeGrooming: (id) =>
    set((state) => ({
      groomings: state.groomings.filter((grooming) => grooming.id !== id),
    })),
}))
