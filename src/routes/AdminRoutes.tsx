import GroomingForm from '@/pages/admin/Grooming/GroomingForm'
import CustomerForm from '@/pages/admin/Customer/CustomerForm'
import ProductForm from '@/pages/admin/Product/ProductForm'
import ServiceForm from '@/pages/admin/Service/ServiceForm'
import StockForm from '@/pages/admin/Stock/StockForm'
import PetForm from '@/pages/admin/Pet/PetForm'
import Grooming from '@/pages/admin/Grooming'
import AdminLayout from '@/Layouts/AdminLayout'
import Customer from '@/pages/admin/Customer'
import NotFound from '@/pages/error/NotFound'
import Product from '@/pages/admin/Product'
import Service from '@/pages/admin/Service'
import Stock from '@/pages/admin/Stock'
import Home from '@/pages/admin/Home'
import Pet from '@/pages/admin/Pet'

import { ProtectedRoute } from './ProtectedRoute'
import { Route, Routes } from 'react-router-dom'

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
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
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AdminRoutes
