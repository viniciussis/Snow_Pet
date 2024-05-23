import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import SearchBar from '@/components/SearchBar'
import TableFlex from '@/components/TableFlex'
import ICustomer from '@/interfaces/ICustomer'
import IColumn from '@/interfaces/IColumn'
import Button from '@/components/Button'
import http from '@/http'
import './Customer.scss'

const customerColumns: IColumn<ICustomer>[] = [
  { id: 'name', label: 'Nome', minWidth: 100 },
  { id: 'address', label: 'Endereço', minWidth: 150 },
  { id: 'email', label: 'Email', minWidth: 125 },
  { id: 'phoneNumber', label: 'Telefone', minWidth: 75, align: 'center' },
]

const Customer = () => {
  const [customers, setCustomers] = useState<ICustomer[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    http.get<ICustomer[]>('customers/').then((response) => {
      setCustomers(response.data)
    })
  }, [])

  const updateCustomer = (id: number) => {
    navigate(`/cliente/${id}`)
  }

  const removeCustomer = (id: number) => {
    const updatedCustomers = customers.filter((customer) => customer._id !== id)
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
        columns={customerColumns}
        data={customers}
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
