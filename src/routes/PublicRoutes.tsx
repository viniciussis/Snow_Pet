import PasswordReset from '@/pages/auth/PasswordReset'
import DefaultLayout from '@/Layouts/DefaultLayout'
import AuthLayout from '@/Layouts/AuthLayout'
import NotFound from '@/pages/error/NotFound'
import SignIn from '@/pages/auth/Signin'
import SignUp from '@/pages/auth/Signup'

import { Navigate, Route, Routes } from 'react-router-dom'

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="auth" element={<AuthLayout />}>
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="password-reset" element={<PasswordReset />} />
      </Route>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<Navigate to={'/auth/signin'} />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default PublicRoutes
