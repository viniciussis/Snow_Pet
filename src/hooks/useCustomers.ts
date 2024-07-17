import { create } from 'zustand'

import ICustomer from '@/interfaces/ICustomer'

interface CustomerState {
  customers: ICustomer[]
  customersSearch: ICustomer[]
  removeCustomer: (id: string) => void
  searchCustomers: (search: string) => void
  setCustomers: (customers: ICustomer[]) => void
  getCustomerById: (id: string) => ICustomer | undefined
}

const useCustomers = create<CustomerState>()((set, get) => ({
  customers: [],
  customersSearch: [],
  setCustomers: (customers) => set({ customers, customersSearch: customers }),
  getCustomerById: (id) =>
    get().customersSearch.find((customer) => customer.id === id),
  removeCustomer: (id) => {
    set((state) => ({
      customers: state.customers.filter((customer) => customer.id !== id),
    }))
  },
  searchCustomers: (search) => {
    if (search) {
      set((state) => ({
        customersSearch: state.customersSearch.filter((customer) =>
          customer.name.toLowerCase().includes(search.toLowerCase()),
        ),
      }))
    } else {
      set({ customersSearch: get().customers })
    }
  },
}))

export default useCustomers
