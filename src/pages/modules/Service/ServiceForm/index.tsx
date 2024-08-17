import { useNavigate, useParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import { useServices, useCustomers } from '@/hooks/stores'
import { Service } from '@/shared/schemas'
import Button from '@/components/Button'
import Select from '@/components/Select'
import Modal from '@/components/Modal'
import Field from '@/components/Field'
import './ServiceForm.scss'
import api from '@/api'

const ServiceForm = () => {
  const { getServiceById } = useServices()
  const { customers } = useCustomers()
  const navigate = useNavigate()
  const params = useParams()

  const service = params.id ? getServiceById(params.id) : undefined
  const customersList = customers.map((customer) => ({
    value: customer.id as string,
    label: customer.name,
  }))
  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid, isSubmitting, errors },
  } = useForm<Service>({
    defaultValues: service ?? {
      customerId: '',
      date: new Date(),
      totalValue: 0,
    },
  })

  const addService = useMutation({
    mutationFn: (data: Service) => {
      return api.post<Service>('services/', data)
    },
    onSuccess: () => {
      navigate('/atendimento')
    },
    onError: (err) => {
      console.log(err.message)
    },
  })

  const updateService = useMutation({
    mutationFn: (data: Service) => {
      return api.patch<Service>(`services/${params.id}`, data)
    },
    onSuccess: () => {
      navigate('/atendimento')
    },
    onError: (err) => {
      console.log(err.message)
    },
  })

  const submitting = (data: Service) => {
    if (params.id) {
      updateService.mutate(data)
    } else {
      addService.mutate(data)
    }
  }

  return (
    <>
      <div className="serviceFormContainer" />
      <Modal title="Formulário de Atendimento">
        <form className="serviceForm" onSubmit={handleSubmit(submitting)}>
          <Select
            label="Cliente*"
            options={customersList}
            {...register('customerId')}
            errors={errors.customerId?.message}
          />
          <Field
            min={0}
            type="number"
            label="Valor Total*"
            errors={errors.totalValue?.message}
            {...register('totalValue', { valueAsNumber: true })}
          />
          <Field
            label="Data*"
            type="datetime-local"
            errors={errors.date?.message}
            {...register('date', { valueAsDate: true })}
          />
          <div className="serviceForm__actions">
            <Button text="Adicionar Serviço" colorType="primary" />
            <Button text="Adicionar Produto" colorType="primary" />
            <Button
              text="Cancelar"
              colorType="fail"
              onClick={() => navigate('/atendimento')}
            />
            <Button
              type="submit"
              text="Cadastrar"
              colorType="success"
              disabled={!isDirty || !isValid || isSubmitting}
            />
          </div>
        </form>
      </Modal>
    </>
  )
}

export default ServiceForm
