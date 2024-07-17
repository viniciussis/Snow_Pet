import { useQuery } from '@tanstack/react-query'

import ICategory from '@/interfaces/ICategory'
import api from '..'

const fetchCategories = async () => {
  const resp = await api.get<ICategory[]>('categories')
  return resp.data
}

export const useCategoriesQuery = () =>
  useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    // staleTime: 1000 * 60, // 1 minute
  })
