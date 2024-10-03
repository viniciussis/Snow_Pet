import GroomingForm from '@/pages/modules/Grooming/GroomingForm'
import CustomerForm from '@/pages/modules/Customer/CustomerForm'
import ProductForm from '@/pages/modules/Product/ProductForm'
import ServiceForm from '@/pages/modules/Service/ServiceForm'
import StockForm from '@/pages/modules/Stock/StockForm'
import PetForm from '@/pages/modules/Pet/PetForm'
import Grooming from '@/pages/modules/Grooming'
import AdminLayout from '@/Layouts/AdminLayout'
import Customer from '@/pages/modules/Customer'
import Product from '@/pages/modules/Product'
import Service from '@/pages/modules/Service'
import Stock from '@/pages/modules/Stock'
import Home from '@/pages/common/Home'
import Pet from '@/pages/modules/Pet'

import { Route, Routes } from 'react-router-dom'

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="home" element={<Home />} />
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

export default AdminRoutes
