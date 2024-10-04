import NotFound from '@/pages/common/NotFound'
import UserLayout from '@/Layouts/UserLayout'

import { Route, Routes } from 'react-router-dom'

const UserRoutes = () => {
  return (
    <Routes>
      <Route element={<UserLayout />}></Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default UserRoutes
