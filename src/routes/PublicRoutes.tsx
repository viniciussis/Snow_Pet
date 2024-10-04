import DefaultLayout from '@/Layouts/DefaultLayout'
import SignIn from '@/pages/auth/Signin'
import NotFound from '@/pages/error/NotFound'

import { Navigate, Route, Routes } from 'react-router-dom'

const PublicRoutes = () => {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="signin" element={<SignIn />} />
        <Route path="/" element={<Navigate to={'/signin'} />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default PublicRoutes
