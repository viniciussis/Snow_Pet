import { create } from 'zustand'

import IItem from '@/interfaces/IItem'

interface ItemState {
  items: IItem[]
  setItems: (items: IItem[]) => void
  getItemById: (id: string) => IItem | undefined
  removeItem: (id: string) => void
}

const useItems = create<ItemState>()((set, get) => ({
  items: [],
  setItems: (items) => set({ items }),
  getItemById: (id) => get().items.find((item) => item.id === id),
  removeItem: (id) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }))
  },
}))

export default useItems
