import { useQuery } from '@tanstack/react-query'

import IGrooming from '@/interfaces/IGrooming'
import api from '..'

const fetchGroomings = async () => {
  const resp = await api.get<IGrooming[]>('groomings/')
  return resp.data
}

export const useGroomingsQuery = () =>
  useQuery({
    queryKey: ['groomings'],
    queryFn: fetchGroomings,
    // staleTime: 1000 * 60, // 1 minute
  })
