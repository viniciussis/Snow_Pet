import { ICategory } from '@/shared/interfaces'
import { create } from 'zustand'

interface CategoryState {
  categories: ICategory[]
  setCategories: (categories: ICategory[]) => void
  getCategoryById: (id: string) => ICategory | undefined
  removeCategory: (id: string) => void
}

export const useCategories = create<CategoryState>()((set, get) => ({
  categories: [],
  setCategories: (categories) => set({ categories }),
  getCategoryById: (id) =>
    get().categories.find((category) => category.id === id),
  removeCategory: (id) => {
    set((state) => ({
      categories: state.categories.filter((category) => category.id !== id),
    }))
  },
}))
