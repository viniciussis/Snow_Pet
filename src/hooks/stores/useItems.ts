import { IItem } from '@/shared/interfaces'
import { create } from 'zustand'

interface ItemState {
  items: IItem[]
  setItems: (items: IItem[]) => void
  getItemById: (id: string) => IItem | undefined
  removeItem: (id: string) => void
}

export const useItems = create<ItemState>()((set, get) => ({
  items: [],
  setItems: (items) => set({ items }),
  getItemById: (id) => get().items.find((item) => item.id === id),
  removeItem: (id) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }))
  },
}))
