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
import CreatePetForm from './pages/Pet/PetForm'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Default />}>
        <Route index element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="cliente" element={<Cliente />} />
        <Route path="pets" element={<Pet />} />
        <Route path="pets/novo" element={<CreatePetForm />} />
        <Route path="pets/:id" element={<CreatePetForm />} />
        <Route path="banho_e_tosa" element={<Banho />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
