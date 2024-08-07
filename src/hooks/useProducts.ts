import { create } from 'zustand'

import IProduct from '@/interfaces/IProduct'

interface ProductState {
  products: IProduct[]
  productsSearch: IProduct[]
  removeProduct: (id: string) => void
  setProducts: (pets: IProduct[]) => void
  searchProducts: (search: string) => void
  getProductById: (id: string) => IProduct | undefined
}

const useProducts = create<ProductState>()((set, get) => ({
  products: [],
  productsSearch: [],
  setProducts: (products) => set({ products, productsSearch: products }),
  getProductById: (id) =>
    get().productsSearch.find((product) => product.id === id),
  removeProduct: (id) => {
    set((state) => ({
      products: state.products.filter((product) => product.id !== id),
      productsSearch: state.productsSearch.filter(
        (product) => product.id !== id,
      ),
    }))
  },
  searchProducts: (search) => {
    if (search) {
      set((state) => ({
        productsSearch: state.productsSearch.filter((product) =>
          product.name.toLowerCase().includes(search.toLowerCase()),
        ),
      }))
    } else {
      set({ productsSearch: get().products })
    }
  },
}))

export default useProducts
