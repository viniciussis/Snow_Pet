import { useAuthStore } from '@/hooks/stores'
import { useAuth } from '@/api/queries/auth'
import { Navigate } from 'react-router-dom'
import Loading from '@/components/Loading'

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = useAuthStore((s) => s.token)
  const { isPending, isError } = useAuth()

  if (!token) return <Navigate to="/auth/signin" />
  if (isPending) return <Loading />
  if (isError) return <Navigate to="/auth/signin" />

  return children
}
