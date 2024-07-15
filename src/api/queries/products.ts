import { useQuery } from '@tanstack/react-query'

import IProduct from '@/interfaces/IProduct'
import api from '..'

const fetchProducts = async () => {
  const resp = await api.get<IProduct[]>('products')
  return resp.data
}

export const useProductsQuery = () =>
  useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 60000,
  })
