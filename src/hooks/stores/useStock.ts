import { IStock } from '@/shared/interfaces'
import { create } from 'zustand'

interface StockState {
  stock: IStock[]
  setStock: (stock: IStock[]) => void
  getStockProductById: (id: string) => IStock | undefined
  removeStockProduct: (id: string) => void
}

export const useStockProducts = create<StockState>()((set, get) => ({
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
