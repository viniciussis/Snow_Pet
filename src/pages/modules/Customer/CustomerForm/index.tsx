import { useNavigate, useParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { DevTool } from '@hookform/devtools'
import { useForm } from 'react-hook-form'

import useCustomers from '@/hooks/useCustomers'
import ICustomer from '@/interfaces/ICustomer'
import Button from '@/components/Button'
import Modal from '@/components/Modal'
import Field from '@/components/Field'
import './CustomerForm.scss'
import api from '@/api'

const CustomerForm = () => {
  const { getCustomerById } = useCustomers()
  const navigate = useNavigate()
  const params = useParams()

  const customer = params.id ? getCustomerById(params.id) : undefined
  const { register, control, handleSubmit } = useForm<ICustomer>({
    defaultValues: customer ?? {
      name: '',
      address: {
        neighborhood: '',
        houseNumber: '',
        street: '',
        complement: '',
      },
      phoneNumber: '',
      email: '',
      socialMedia: '',
    },
  })

  const addCustomer = useMutation({
    mutationFn: (data: ICustomer) => {
      return api.post<ICustomer>('customers/', data)
    },
    onSuccess: () => {
      navigate('/cliente')
    },
    onError: (err) => {
      console.log(err.message)
    },
  })

  const updateCustomer = useMutation({
    mutationFn: (data: ICustomer) => {
      return api.patch<ICustomer>(`customers/${params.id}`, data)
    },
    onSuccess: () => {
      navigate('/cliente')
    },
    onError: (err) => {
      console.log(err.message)
    },
  })

  const submitting = (data: ICustomer) => {
    console.log(data)
    const { id, ...customer } = data
    if (params.id) {
      updateCustomer.mutate(customer)
    } else {
      addCustomer.mutate(customer)
    }
  }

  return (
    <>
      <div className="customerFormContainer" />
      <Modal title="Formulário de Clientes">
        <form className="customerForm" onSubmit={handleSubmit(submitting)}>
          <div className="customerForm__rows">
            <Field label="Nome*" {...register('name')} required={true} />
            <Field label="Email" {...register('email')} required={true} />
          </div>
          <div className="customerForm__rows">
            <Field
              label="Rua*"
              {...register('address.street')}
              required={true}
            />
            <Field
              label="Número*"
              {...register('address.houseNumber')}
              required={true}
            />
            <Field label="Complemento" {...register('address.complement')} />
          </div>
          <div className="customerForm__rows">
            <Field
              label="Bairro*"
              {...register('address.neighborhood')}
              required={true}
            />
            <Field
              label="Celular*"
              {...register('phoneNumber')}
              required={true}
            />
            <Field label="Instagram" {...register('socialMedia')} />
          </div>
          <div className="customerForm__actions">
            <Button
              text="Cancelar"
              colorType="fail"
              onClick={() => navigate('/cliente')}
            />
            <Button type="submit" text="Cadastrar" colorType="success" />
          </div>
        </form>
      </Modal>
      <DevTool
        control={control}
        styles={{
          button: { transform: 'scale(1.5)' },
        }}
      />
    </>
  )
}

export default CustomerForm
