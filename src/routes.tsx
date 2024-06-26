import { Route, Routes } from 'react-router-dom'

import './assets/styles/typography.scss'
import './assets/styles/normalize.scss'
import './assets/styles/reset.scss'
import './main.scss'

import CustomerForm from './pages/Customer/CustomerForm'
import EmployeeForm from './pages/Employee/EmployeeForm'
import ProductForm from './pages/Product/ProductForm'
import Default from '@/components/Default'
import PetForm from './pages/Pet/PetForm'
import Customer from './pages/Customer'
import Employee from './pages/Employee'
import NotFound from '@/pages/NotFound'
import Product from './pages/Product'
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
        <Route path="cliente" element={<Customer />} />
        <Route path="cliente/novo" element={<CustomerForm />} />
        <Route path="cliente/:id" element={<CustomerForm />} />
        <Route path="funcionario" element={<Employee />} />
        <Route path="funcionario/novo" element={<EmployeeForm />} />
        <Route path="funcionario/:id" element={<EmployeeForm />} />
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
