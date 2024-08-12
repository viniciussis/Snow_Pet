import { useNavigate, useParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { DevTool } from '@hookform/devtools'
import { useForm } from 'react-hook-form'
import  { useEffect } from 'react'

import ICustomer from '@/interfaces/ICustomer'
import useCustomers from '@/hooks/useCustomers'
import Button from '@/components/Button'
import Modal from '@/components/Modal'
import './CustomerForm.scss'
import api from '@/api'
import Field from '@/components/Field'

const CustomerForm = () => {
  const { getCustomerById } = useCustomers()
  const navigate = useNavigate()
  const params = useParams()
  const customer = params.id ? getCustomerById(params.id) : undefined
  const { register, control } = useForm<ICustomer>({
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
    mutationFn: () => {
      return api.post<ICustomer>('customers/', newCustomer)
    },
    onSuccess: () => {
      navigate('/cliente')
    },
    onError: (err) => {
      console.log(err.message)
    },
  })

  const updateCustomer = useMutation({
    mutationFn: () => {
      return api.patch<ICustomer>(`customers/${params.id}`, newCustomer)
    },
    onSuccess: () => {
      navigate('/cliente')
    },
    onError: (err) => {
      console.log(err.message)
    },
  })

  useEffect(() => {
    if (params.id) {
      const customer = getCustomerById(params.id)
      if (customer !== undefined) {
        setNewCustomer({
          name: customer.name,
          address: {
            neighborhood: customer.address.neighborhood,
            houseNumber: customer.address.houseNumber,
            street: customer.address.street,
            complement: customer.address.complement,
          },
          phoneNumber: customer.phoneNumber,
          email: customer.email,
          socialMedia: customer.socialMedia,
        })
      }
    }
  }, [params, getCustomerById])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(newCustomer)
    if (params.id) {
      updateCustomer.mutate()
    } else {
      addCustomer.mutate()
    }
  }

  return (
    <>
      <div className="customerFormContainer" />
      <Modal title="Formulário de Clientes">
        <form className="customerForm" onSubmit={handleSubmit}>
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
              label="Número da casa*"
              {...register('address.houseNumber')}
              required={true}
            />
            <Field
              label="Complemento"
              {...register('address.complement')}
              required={true}
            />
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
            <Field
              label="Instagram"
              {...register('socialMedia')}
              required={true}
            />
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
        <DevTool control={control} />
      </Modal>
    </>
  )
}

export default CustomerForm
