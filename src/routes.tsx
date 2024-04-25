import './main.scss'
import './assets/styles/normalize.scss'
import './assets/styles/reset.scss'
import './assets/styles/typography.scss'
import { Route, Routes } from 'react-router-dom'
import Home from '@/pages/Home'
import Default from '@/components/Default'
import NotFound from '@/pages/NotFound'
import Cliente from './pages/Cliente'
import Banho from './pages/Banho'
import Pet from './pages/Pet'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Default />}>
        <Route index element={<Home />} />
        <Route path='*' element={<NotFound />} />
        <Route path='cliente' element={<Cliente/>} />
        <Route path='pet' element={<Pet/>} />
        <Route path='banho_e_tosa' element={<Banho/>} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
