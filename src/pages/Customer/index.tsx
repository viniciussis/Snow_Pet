import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import ICustomerColumn from '@/interfaces/ICustomerColumn'
import customersList from '@/data/customers.json'
import SearchBar from '@/components/SearchBar'
import TableFlex from '@/components/TableFlex'
import Button from '@/components/Button'
import './Customer.scss'

const customersColumns: ICustomerColumn[] = [
  { id: 'name', label: 'Nome', minWidth: 100 },
  { id: 'address', label: 'Endereço', minWidth: 150 },
  { id: 'email', label: 'Email', minWidth: 125 },
  { id: 'phoneNumber', label: 'Telefone', minWidth: 75, align: 'center' },
]

const Customer = () => {
  const [customers, setCustomers] = useState(customersList)
  const navigate = useNavigate()

  const updateCustomer = (id: number) => {
    navigate(`/cliente/${id}`)
  }

  const removeCustomer = (id: number) => {
    const updatedCustomers = customers.filter((customer) => customer.id !== id)
    setCustomers(updatedCustomers)
  }

  return (
    <div className="costumer">
      <h1 className="costumer__title">Gerenciamento de Clientes</h1>
      <div className="costumer__actions">
        <SearchBar placeholder="Pesquisar Clientes..." />
        <Button text="Novo Cliente" onClick={() => navigate('/cliente/novo')} />
      </div>
      <TableFlex
        remove={removeCustomer}
        update={updateCustomer}
        columns={customersColumns}
        items={customers}
      />
      <div className="costumer__reports">
        <Button
          onClick={() => navigate('/relatorios/cliente')}
          text="Relatórios"
        />
      </div>
    </div>
  )
}

export default Customer
