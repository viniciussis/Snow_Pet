import UserLayout from '@/Layouts/UserLayout'
import { Route, Routes } from 'react-router-dom'

const UserRoutes = () => {
  return (
    <Routes>
      <Route element={<UserLayout />}></Route>
    </Routes>
  )
}

export default UserRoutes
