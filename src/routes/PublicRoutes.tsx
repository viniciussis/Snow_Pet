import DefaultLayout from '@/Layouts/DefaultLayout'
import SignIn from '@/pages/auth/Signin'

import { Route, Routes } from 'react-router-dom'

const PublicRoutes = () => {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="signin" element={<SignIn />} />
      </Route>
    </Routes>
  )
}

export default PublicRoutes
