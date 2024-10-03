import { Route, Routes } from 'react-router-dom'

import './assets/styles/typography.scss'
import './assets/styles/normalize.scss'
import './assets/styles/reset.scss'
import './main.scss'

import PublicRoutes from './routes/PublicRoutes'
import AdminRoutes from './routes/AdminRoutes'
import UserRoutes from './routes/UserRoutes'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<PublicRoutes />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="/user/*" element={<UserRoutes />} />
    </Routes>
  )
}

export default AppRoutes
