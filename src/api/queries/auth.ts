import { useAuthStore } from '@/hooks/stores/useAuth'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import api from '..'

interface SigninData {
  email: string
  password: string
}

export const useAuth = () => {
  const setAuth = useAuthStore((s) => s.setAuth)
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (data: SigninData) => {
      const res = await api.post('/auth/signin', data)
      return res.data
    },
    onSuccess: ({ token, user }) => {
      setAuth(token, user)
      navigate('/admin/home')
    },
    onError: () => {
      alert('Credenciais inválidas. Tente novamente.')
    },
  })
}
