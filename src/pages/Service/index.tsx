import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import { useServicesQuery } from '@/api/queries/services'
import { useCustomersQuery } from '@/api/queries/customers'
import useCustomers from '@/hooks/useCustomers'
import SearchBar from '@/components/SearchBar'
import TableFlex from '@/components/TableFlex'
import ICustomer from '@/interfaces/ICustomer'
import useServices from '@/hooks/useServices'
import IService from '@/interfaces/IService'
import formatDate from '@/utils/formatDate'
import Loading from '@/components/Loading'
import IColumn from '@/interfaces/IColumn'
import formatBrl from '@/utils/formatBrl'
import Button from '@/components/Button'
import './Service.scss'
import api from '@/api'

const serviceColumns: IColumn<IService & ICustomer>[] = [
  { id: 'name', label: 'Cliente', align: 'center', minWidth: 100 },
  {
    id: 'totalValue',
    label: 'Valor Total',
    align: 'center',
    minWidth: 50,
    formatBrl,
  },
  { id: 'date', label: 'Data', minWidth: 75, align: 'center', formatDate },
]

const Service = () => {
  const navigate = useNavigate()
  const customersQuery = useCustomersQuery()
  const servicesQuery = useServicesQuery()
  const { getCustomerById, setCustomers } = useCustomers()
  const { setServices, services, removeService } = useServices()

  useEffect(() => {
    if (servicesQuery.isSuccess && customersQuery.isSuccess) {
      setServices(servicesQuery.data)
      setCustomers(customersQuery.data)
    }
  }, [
    customersQuery.data,
    customersQuery.isSuccess,
    servicesQuery.data,
    servicesQuery.isSuccess,
    setCustomers,
    setServices,
  ])

  const assemblingData = () => {
    const tableData = services.map((service) => {
      const customerData = getCustomerById(service.customerId)
      return {
        ...service,
        name: customerData?.name,
      }
    })
    return tableData
  }

  const updateService = (id: string) => {
    navigate(`/atendimentos/${id}`)
  }

  const deleteService = useMutation({
    mutationFn: (id: string) => {
      return api.delete(`services/${id}`)
    },
    onSuccess: (data, id) => {
      console.log(data)
      removeService(id)
    },
    onError: (err) => {
      console.error(err.message)
    },
  })

  return (
    <div className="service">
      <h1 className="service__title">Gerenciamento de Atendimentos</h1>
      <div className="service__actions">
        <SearchBar placeholder="Pesquisar Atendimentos..." />
        <Button
          text="Novo Atendimento"
          onClick={() => navigate('/atendimento/novo')}
        />
      </div>
      {servicesQuery.isLoading && customersQuery.isLoading ? (
        <Loading />
      ) : (
        <TableFlex
          remove={deleteService.mutate}
          update={updateService}
          columns={serviceColumns}
          data={assemblingData()}
        />
      )}
      <div>
        <Button
          onClick={() => navigate('/relatorios/atendimento')}
          text="Relatórios"
        />
      </div>
    </div>
  )
}

export default Service
