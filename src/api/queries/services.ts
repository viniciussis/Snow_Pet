import { useQuery } from '@tanstack/react-query'

import { IService } from '@/shared/interfaces'
import api from '..'

const fetchServices = async () => {
  const resp = await api.get<IService[]>('services')
  return resp.data
}

export const useServicesQuery = () =>
  useQuery({
    queryKey: ['services'],
    queryFn: fetchServices,
    // staleTime: 1000 * 60, // 1 minute
  })
