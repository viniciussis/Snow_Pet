import { useAuthStore } from '@/hooks/stores/useAuth'
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/v1/',
})

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
