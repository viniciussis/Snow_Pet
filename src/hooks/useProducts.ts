import { create } from 'zustand'

import IProduct from '@/interfaces/IProduct'

interface ProductState {
  products: IProduct[]
  setProducts: (pets: IProduct[]) => void
  getProductById: (id: string) => IProduct | undefined
  removeProduct: (id: string) => void
}

const useProducts = create<ProductState>()((set, get) => ({
  products: [],
  setProducts: (products) => set({ products }),
  getProductById: (id) => get().products.find((product) => product.id === id),
  removeProduct: (id) => {
    set((state) => ({
      products: state.products.filter((product) => product.id !== id),
    }))
  },
}))

export default useProducts
