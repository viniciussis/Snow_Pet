import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import { useCustomersQuery, useServicesQuery } from '@/api/queries'
import { IColumn, IService, ICustomer } from '@/shared/interfaces'
import { useCustomers, useServices } from '@/hooks/stores'
import { formatBrl, formatDate } from '@/utils'
import SearchBar from '@/components/SearchBar'
import TableFlex from '@/components/TableFlex'
import Loading from '@/components/Loading'
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
  const {
    isSuccess: isCustomersSuccess,
    data: customersData,
    isPending: isCustomersPendind,
  } = useCustomersQuery()
  const {
    isSuccess: isServicesSuccess,
    data: servicesData,
    isPending: isServicesPendind,
  } = useServicesQuery()
  const { getCustomerById, setCustomers, searchCustomers } = useCustomers()
  const { setServices, services, removeService } = useServices()
  const navigate = useNavigate()

  useEffect(() => {
    if (isCustomersSuccess && isServicesSuccess) {
      setServices(servicesData)
      setCustomers(customersData)
    }
  }, [
    customersData,
    isCustomersSuccess,
    isServicesSuccess,
    servicesData,
    setCustomers,
    setServices,
  ])

  const assemblingData = () => {
    return services.flatMap((service) => {
      const customerData = getCustomerById(service.customerId)
      return customerData ? { ...service, name: customerData.name } : []
    })
  }

  const updateService = (id: string) => {
    navigate(`/atendimento/${id}`)
  }

  const deleteService = useMutation({
    mutationFn: (id: string) => {
      return api.delete(`services/${id}`)
    },
    onSuccess: (_, id) => {
      removeService(id)
    },
    onError: (err) => {
      console.error(err.message)
    },
  })

  return (
    <div className="service">
      <div className="service__management">
        <Button text="< Voltar" onClick={() => navigate('/')} />
        <h1 className="service__management__title">
          Gerenciamento de Atendimentos
        </h1>
      </div>
      <div className="service__actions">
        <SearchBar
          search={searchCustomers}
          placeholder="Pesquise pelo nome do cliente"
        />
        <Button
          text="Novo Atendimento"
          onClick={() => navigate('/atendimento/novo')}
        />
      </div>
      {isCustomersPendind || isServicesPendind ? (
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
