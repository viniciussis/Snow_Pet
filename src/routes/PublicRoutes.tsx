import DefaultLayout from '@/Layouts/DefaultLayout'
import SignIn from '@/pages/auth/Signin'
import NotFound from '@/pages/common/NotFound'

import { Route, Routes } from 'react-router-dom'

const PublicRoutes = () => {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="signin" element={<SignIn />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default PublicRoutes
