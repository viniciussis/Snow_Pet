import { useQuery } from '@tanstack/react-query'

import IStock from '@/interfaces/IStock'
import api from '..'

const fetchStockProducts = async () => {
  const resp = await api.get<IStock[]>('stock')
  return resp.data
}

export const useStockQuery = () =>
  useQuery({
    queryKey: ['stock'],
    queryFn: fetchStockProducts,
    // staleTime: 1000 * 60, // 1 minute
  })
