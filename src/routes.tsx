import { Route, Routes } from 'react-router-dom'

import './assets/styles/typography.scss'
import './assets/styles/normalize.scss'
import './assets/styles/reset.scss'
import './main.scss'

import Default from '@/components/Default'
import PetForm from './pages/Pet/PetForm'
import NotFound from '@/pages/NotFound'
import Cliente from './pages/Customer'
import Banho from './pages/Banho'
import Home from '@/pages/Home'
import Pet from './pages/Pet'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Default />}>
        <Route index element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="banho_e_tosa" element={<Banho />} />
        <Route path="banho_e_tosa/novo" element={<Banho />} />
        <Route path="banho_e_tosa/:id" element={<Banho />} />
        <Route path="cliente" element={<Cliente />} />
        <Route path="cliente/novo" element={<Cliente />} />
        <Route path="cliente/:id" element={<Cliente />} />
        <Route path="pet" element={<Pet />} />
        <Route path="pet/novo" element={<PetForm />} />
        <Route path="pet/:id" element={<PetForm />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
