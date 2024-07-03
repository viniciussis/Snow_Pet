import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import formatAddress from '@/utils/formatAddress'
import useCustomers from '@/hooks/useCustomers'
import SearchBar from '@/components/SearchBar'
import TableFlex from '@/components/TableFlex'
import ICustomer from '@/interfaces/ICustomer'
import Loading from '@/components/Loading'
import IColumn from '@/interfaces/IColumn'
import Button from '@/components/Button'
import './Customer.scss'
import api from '@/api'

const customerColumns: IColumn<ICustomer>[] = [
  { id: 'name', label: 'Nome', minWidth: 125 },
  { id: 'address', label: 'Endereço', minWidth: 150, format: formatAddress },
  { id: 'email', label: 'Email', minWidth: 100 },
  { id: 'phoneNumber', label: 'Telefone', minWidth: 75, align: 'center' },
  { id: 'socialMedia', label: 'Instagram', minWidth: 75, align: 'center' },
]

const fetchCustomers = async (): Promise<ICustomer[]> => {
  const resp = await api.get<ICustomer[]>('customers')
  return resp.data
}

const Customer = () => {
  const navigate = useNavigate()
  const { setCustomers, customers, removeCustomer } = useCustomers()
  const { isSuccess, isLoading, data } = useQuery({
    queryKey: ['customers'],
    queryFn: fetchCustomers,
  })

  useEffect(() => {
    if (isSuccess) {
      setCustomers(data)
    }
  }, [data, isSuccess, setCustomers])

  const updateCustomer = (id: string) => {
    navigate(`/cliente/${id}`)
  }

  const deleteCustomer = useMutation({
    mutationFn: (id: string) => {
      return api.delete(`customers/${id}`)
    },
    onSuccess: (data, id) => {
      console.log(data)
      removeCustomer(id)
    },
    onError: (err) => {
      console.log(err.message)
    },
  })

  return (
    <div className="customer">
      <h1 className="customer__title">Gerenciamento de Clientes</h1>
      <div className="customer__actions">
        <SearchBar placeholder="Pesquisar Clientes..." />
        <Button text="Novo Cliente" onClick={() => navigate('/cliente/novo')} />
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <TableFlex
          remove={deleteCustomer.mutate}
          update={updateCustomer}
          columns={customerColumns}
          data={customers}
        />
      )}
      <div>
        <Button
          onClick={() => navigate('/relatorios/cliente')}
          text="Relatórios"
        />
      </div>
    </div>
  )
}

export default Customer
