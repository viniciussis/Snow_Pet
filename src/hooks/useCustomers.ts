import { create } from 'zustand'

import ICustomer from '@/interfaces/ICustomer'

interface CustomerState {
  customers: ICustomer[]
  setCustomers: (customers: ICustomer[]) => void
  getCustomerById: (id: string) => ICustomer | undefined
  removeCustomer: (id: string) => void
}

const useCustomers = create<CustomerState>()((set, get) => ({
  customers: [],
  setCustomers: (customers) => set({ customers }),
  getCustomerById: (id) =>
    get().customers.find((customer) => customer.id === id),
  removeCustomer: (id) => {
    set((state) => ({
      customers: state.customers.filter((customer) => customer.id !== id),
    }))
  },
}))

export default useCustomers
