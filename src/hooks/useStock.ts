import { create } from 'zustand'

import IStock from '@/interfaces/IStock'

interface StockState {
  stock: IStock[]
  setStock: (stock: IStock[]) => void
  getStockProductById: (id: string) => IStock | undefined
  removeStockProduct: (id: string) => void
}

const useItems = create<StockState>()((set, get) => ({
  stock: [],
  setStock: (stock) => set({ stock }),
  getStockProductById: (id) =>
    get().stock.find((stockProduct) => stockProduct.id === id),
  removeStockProduct: (id) => {
    set((state) => ({
      stock: state.stock.filter((stockProduct) => stockProduct.id !== id),
    }))
  },
}))

export default useItems
