import { create } from 'zustand'

import ICustomer from '@/interfaces/ICustomer'

interface customerState {
  customers: ICustomer[]
  setCustomers: (customers: ICustomer[]) => void
}

const useCustomers = create<customerState>()((set) => ({
  customers: [],
  setCustomers: (customers) => set({ customers }),
}))

export default useCustomers
