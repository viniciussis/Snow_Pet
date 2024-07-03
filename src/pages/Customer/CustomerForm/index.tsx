import { useNavigate, useParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'

import ICustomer from '@/interfaces/ICustomer'
import useCustomers from '@/hooks/useCustomers'
import Button from '@/components/Button'
import Modal from '@/components/Modal'
import './CustomerForm.scss'
import api from '@/api'

const CustomerForm = () => {
  const { getCustomerById } = useCustomers()
  const params = useParams()
  const navigate = useNavigate()
  const [newCustomer, setNewCustomer] = useState<ICustomer>({
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

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1]
      setNewCustomer((prevCustomer) => ({
        ...prevCustomer,
        address: {
          ...prevCustomer?.address,
          [addressField]: value,
        },
      }))
    } else if (
      name === 'complement' ||
      name === 'neighborhood' ||
      name === 'number' ||
      name === 'street'
    ) {
      setNewCustomer((prevCustomer) => ({
        ...prevCustomer,
        address: {
          ...prevCustomer.address,
          [name]: value,
        },
      }))
    } else {
      setNewCustomer({
        ...newCustomer,
        [name]: value,
      })
    }
  }

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
            <label className="customerForm__label">
              Nome do Cliente*:
              <input
                placeholder="Informe o nome do cliente..."
                className="customerForm__input"
                required
                type="text"
                name="name"
                value={newCustomer.name}
                onChange={handleInputChange}
              />
            </label>
            <label className="customerForm__label">
              Email:
              <input
                placeholder="Informe o email... (opcional)"
                className="customerForm__input"
                type="text"
                name="email"
                value={newCustomer.email}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="customerForm__rows">
            <label className="customerForm__label">
              Rua*:
              <input
                placeholder="Informe o nome da rua..."
                className="customerForm__input"
                required
                type="text"
                name="address.street"
                value={newCustomer.address.street}
                onChange={handleInputChange}
              />
            </label>
            <label className="customerForm__label">
              Número*:
              <input
                placeholder="Informe o número da casa..."
                className="customerForm__input"
                required
                type="text"
                name="address.houseNumber"
                value={newCustomer.address.houseNumber}
                onChange={handleInputChange}
              />
            </label>
            <label className="customerForm__label">
              Complemento:
              <input
                placeholder="Informações adicionais (opcional)..."
                className="customerForm__input"
                type="text"
                name="address.complement"
                value={newCustomer.address.complement}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="customerForm__rows">
            <label className="customerForm__label">
              Bairro*:
              <input
                placeholder="informe o bairro..."
                className="customerForm__input"
                required
                type="text"
                name="address.neighborhood"
                value={newCustomer.address.neighborhood}
                onChange={handleInputChange}
              />
            </label>
            <label className="customerForm__label">
              Telefone*:
              <input
                placeholder="Informe o telefone..."
                className="customerForm__input"
                required
                type="text"
                name="phoneNumber"
                value={newCustomer.phoneNumber}
                onChange={handleInputChange}
              />
            </label>
            <label className="customerForm__label">
              Instagram:
              <input
                className="customerForm__input"
                type="text"
                placeholder="Redes sociais... (opcional)"
                name="socialMedia"
                value={newCustomer.socialMedia}
                onChange={handleInputChange}
              />
            </label>
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
    </>
  )
}

export default CustomerForm
