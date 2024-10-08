import { useQuery } from '@tanstack/react-query'

import { ICustomer } from '@/shared/interfaces'
import api from '..'

const fetchCustomers = async () => {
  const resp = await api.get<ICustomer[]>('customers')
  return resp.data
}

export const useCustomersQuery = () =>
  useQuery({
    queryKey: ['customers'],
    queryFn: fetchCustomers,
    // staleTime: 1000 * 60, // 1 minute
  })
