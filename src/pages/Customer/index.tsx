import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import SearchBar from '@/components/SearchBar'
import TableFlex from '@/components/TableFlex'
import ICustomer from '@/interfaces/ICustomer'
import IAddress from '@/interfaces/IAddress'
import IColumn from '@/interfaces/IColumn'
import Button from '@/components/Button'
import http from '@/http'
import './Customer.scss'

const formatAddress = (address: IAddress) => {
  const complement = address.complement ? ', ' + address.complement : ''
  return `${address.street}, ${address.number}${complement} - ${address.neighborhood}`
}

const customerColumns: IColumn<ICustomer>[] = [
  { id: 'name', label: 'Nome', minWidth: 125 },
  { id: 'address', label: 'Endereço', minWidth: 150, format: formatAddress },
  { id: 'email', label: 'Email', minWidth: 100 },
  { id: 'phone_number', label: 'Telefone', minWidth: 75, align: 'center' },
  { id: 'social_media', label: 'Instagram', minWidth: 75, align: 'center' },
]

const Customer = () => {
  const [customers, setCustomers] = useState<ICustomer[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    http.get<ICustomer[]>('customers/').then((response) => {
      setCustomers(response.data)
    })
  }, [])

  const updateCustomer = (id: string) => {
    navigate(`/cliente/${id}`)
  }

  const removeCustomer = (id: string) => {
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
