import { useNavigate, useParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'

import useCustomers from '@/hooks/useCustomers'
import useServices from '@/hooks/useServices'
import IService from '@/interfaces/IService'
import Button from '@/components/Button'
import Modal from '@/components/Modal'
import './ServiceForm.scss'
import api from '@/api'

const ServiceForm = () => {
  const params = useParams()
  const navigate = useNavigate()
  const { getServiceById } = useServices()
  const { customers: customersList } = useCustomers()
  const [newService, setNewService] = useState<IService>({
    customerId: '',
    date: new Date().toUTCString(),
    totalValue: 0,
  })

  const addService = useMutation({
    mutationFn: () => {
      return api.post<IService>('services/', newService)
    },
    onSuccess: () => {
      navigate('/atendimentos')
    },
    onError: (err) => {
      console.log(err.message)
    },
  })

  const updateService = useMutation({
    mutationFn: () => {
      return api.patch<IService>(`services/${params.id}`, newService)
    },
    onSuccess: () => {
      navigate('/atendimentos')
    },
    onError: (err) => {
      console.log(err.message)
    },
  })

  useEffect(() => {
    if (params.id) {
      const service = getServiceById(params.id)
      if (service !== undefined) {
        setNewService(newService)
      }
    }
  }, [params, getServiceById, newService])

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target
    setNewService({
      ...newService,
      [name]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(newService)
    if (params.id) {
      updateService.mutate()
    } else {
      addService.mutate()
    }
  }

  return (
    <>
      <div className="serviceFormContainer" />
      <Modal title="Formulário de Atendimento">
        <form className="serviceForm" onSubmit={handleSubmit}>
          <div className="serviceForm__rows">
            <label className="serviceForm__label">
              Nome do Cliente*:
              <select
                className="serviceForm__select"
                required
                name="customerId"
                value={newService.customerId}
                onChange={handleInputChange}
              >
                <option value="">Selecione o cliente...</option>
                {customersList.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="serviceForm__rows">
            <label className="serviceForm__label">
              Valor Total*:
              <input
                placeholder="informe o valor total do Atendimento..."
                className="serviceForm__input"
                required
                type="number"
                min={0}
                name="totalValue"
                value={newService.totalValue}
                onChange={handleInputChange}
              />
            </label>
            <label className="serviceForm__label">
              Data*:
              <input
                placeholder="informe a data do Atendimento..."
                className="serviceForm__input"
                required
                type="datetime-local"
                name="date"
                value={newService.date}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="serviceForm__rows">
            <ul>Lista de Produtos e Serviços...</ul>
            <Button
              text="Adicionar Serviço"
              colorType="primary"
              onClick={() => navigate('/atendimento/servico')}
            />
            <Button
              text="Adicionar Produto"
              colorType="primary"
              onClick={() => navigate('/atendimento/produto')}
            />
          </div>
          <div className="serviceForm__actions">
            <Button
              text="Cancelar"
              colorType="fail"
              onClick={() => navigate('/cliente')}
            />
            <Button type="submit" text="Cadastrar" colorType="success" />
          </div>
        </form>
      </Modal>
    </>
  )
}

export default ServiceForm
