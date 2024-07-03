import { create } from 'zustand'

import IService from '@/interfaces/IService'

interface ServiceState {
  services: IService[]
  setServices: (services: IService[]) => void
  getServiceById: (id: string) => IService | undefined
  removeService: (id: string) => void
}
  
const useServices = create<ServiceState>()((set, get) => ({
  services: [],
  setServices: (services) => set({ services }),
  getServiceById: (id) =>
    get().services.find((service) => service.id === id),
  removeService: (id) => {
    set((state) => ({
      services: state.services.filter((service) => service.id !== id),
    }))
  },
}))

export default useServices
