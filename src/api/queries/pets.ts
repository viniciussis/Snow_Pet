import { useQuery } from '@tanstack/react-query'

import IPet from '@/interfaces/IPet'
import api from '..'

const fetchPets = async () => {
  const resp = await api.get<IPet[]>('pets/')
  return resp.data
}

export const usePetsQuery = () =>
  useQuery({
    queryKey: ['pets'],
    queryFn: fetchPets,
    staleTime: 1000 * 60, // 1 minute
  })
