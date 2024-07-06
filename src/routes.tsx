import { Route, Routes } from 'react-router-dom'

import './assets/styles/typography.scss'
import './assets/styles/normalize.scss'
import './assets/styles/reset.scss'
import './main.scss'

import GroomingForm from './pages/Grooming/GroomingForm'
import CustomerForm from './pages/Customer/CustomerForm'
import ProductForm from './pages/Product/ProductForm'
import ServiceForm from './pages/Service/ServiceForm'
import StockForm from './pages/Stock/StockForm'
import Default from '@/components/Default'
import PetForm from './pages/Pet/PetForm'
import Customer from './pages/Customer'
import NotFound from '@/pages/NotFound'
import Grooming from './pages/Grooming'
import Service from './pages/Service'
import Product from './pages/Product'
import Stock from './pages/Stock'
import Home from '@/pages/Home'
import Pet from './pages/Pet'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Default />}>
        <Route index element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="atendimento" element={<Service />} />
        <Route path="atendimento/novo" element={<ServiceForm />} />
        <Route path="atendimento/:id" element={<ServiceForm />} />
        <Route path="banho_e_tosa" element={<Grooming />} />
        <Route path="banho_e_tosa/novo" element={<GroomingForm />} />
        <Route path="banho_e_tosa/:id" element={<GroomingForm />} />
        <Route path="cliente" element={<Customer />} />
        <Route path="cliente/novo" element={<CustomerForm />} />
        <Route path="cliente/:id" element={<CustomerForm />} />
        <Route path="estoque" element={<Stock />} />
        <Route path="estoque/novo" element={<StockForm />} />
        <Route path="estoque/:id" element={<StockForm />} />
        <Route path="pet" element={<Pet />} />
        <Route path="pet/novo" element={<PetForm />} />
        <Route path="pet/:id" element={<PetForm />} />
        <Route path="produto" element={<Product />} />
        <Route path="produto/novo" element={<ProductForm />} />
        <Route path="produto/:id" element={<ProductForm />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
