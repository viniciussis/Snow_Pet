import { useNavigate, useParams } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import { Customer, customerSchema } from '@/shared/schemas'
import { useCustomers } from '@/hooks/stores'
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
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm<Customer>({
    defaultValues: customer ?? {
      name: '',
      address: {
        neighborhood: '',
        houseNumber: '',
        street: '',
        complement: '',
      },
      phoneNumber: '',
      socialMedia: '',
      email: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(customerSchema),
  })

  const addCustomer = useMutation({
    mutationFn: (data: Customer) => {
      return api.post<Customer>('customers/', data)
    },
    onSuccess: () => {
      navigate('/cliente')
    },
    onError: (err) => {
      console.log(err.message)
    },
  })

  const updateCustomer = useMutation({
    mutationFn: (data: Customer) => {
      return api.patch<Customer>(`customers/${params.id}`, data)
    },
    onSuccess: () => {
      navigate('/cliente')
    },
    onError: (err) => {
      console.log(err.message)
    },
  })

  const submitting = (data: Customer) => {
    if (data.email === '') {
      data.email = null
    }
    if (params.id) {
      updateCustomer.mutate(data)
    } else {
      addCustomer.mutate(data)
    }
  }

  return (
    <>
      <div className="customerFormContainer" />
      <Modal title="Formulário de Clientes">
        <form
          className="customerForm"
          noValidate
          onSubmit={handleSubmit(submitting)}
        >
          <div className="customerForm__rows">
            <Field
              label="Nome*"
              {...register('name')}
              required={true}
              errors={errors.name?.message}
            />
            <Field
              label="Email"
              {...register('email')}
              errors={errors.email?.message}
            />
          </div>
          <div className="customerForm__rows">
            <Field
              label="Rua*"
              {...register('address.street')}
              required={true}
              errors={errors.address?.street?.message}
            />
            <Field
              label="Número*"
              {...register('address.houseNumber')}
              required={true}
              errors={errors.address?.houseNumber?.message}
            />
            <Field label="Complemento" {...register('address.complement')} />
          </div>
          <div className="customerForm__rows">
            <Field
              label="Bairro*"
              {...register('address.neighborhood')}
              required={true}
              errors={errors.address?.neighborhood?.message}
            />
            <Field
              label="Celular*"
              {...register('phoneNumber')}
              required={true}
              errors={errors.phoneNumber?.message}
            />
            <Field
              label="Instagram"
              {...register('socialMedia')}
              errors={errors.socialMedia?.message}
            />
          </div>
          <div className="customerForm__actions">
            <Button
              text="Cancelar"
              colorType="fail"
              onClick={() => navigate('/cliente')}
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

export default CustomerForm
