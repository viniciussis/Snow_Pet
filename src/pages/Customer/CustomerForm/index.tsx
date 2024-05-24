import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import ICustomer from '@/interfaces/ICustomer'
import Button from '@/components/Button'
import Modal from '@/components/Modal'
import './CustomerForm.scss'
import http from '@/http'

const CustomerForm = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [newCustomer, setNewCustomer] = useState<ICustomer>({
    name: '',
    address: {
      neighborhood: '',
      number: '',
      street: '',
      complement: '',
    },
    phone_number: '',
    email: '',
    social_media: '',
  })

  useEffect(() => {
    if (params.id) {
      http
        .get(`customers/${params.id}`)
        .then((resp) => setNewCustomer(resp.data))
        .catch((err) => console.error(err.message))
    }
  }, [params])

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
          ...prevCustomer.address,
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
    if (params.id) {
      http
        .put(`customers/${params.id}`, {
          ...newCustomer
        })
        .then((resp) => {
          navigate('/cliente')
          console.log(resp.data.message)
        })
        .catch((err) => {
          console.log(err.message)
        })
    } else {
      http
        .post('customers/', {
          ...newCustomer,
        })
        .then((resp) => {
          console.log(resp)
          navigate('/cliente')
        })
        .catch((err) => console.log(err.message))
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
                name="address.number"
                value={newCustomer.address.number}
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
                name="phone_number"
                value={newCustomer.phone_number}
                onChange={handleInputChange}
              />
            </label>
            <label className="customerForm__label">
              Instagram:
              <input
                className="customerForm__input"
                type="text"
                placeholder="Redes sociais... (opcional)"
                name="social_media"
                value={newCustomer.social_media}
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
