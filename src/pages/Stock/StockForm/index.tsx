import { useNavigate, useParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'

import IStock from '@/interfaces/IStock'
import useStockProducts from '@/hooks/useStock'
import Button from '@/components/Button'
import Modal from '@/components/Modal'
import './StockForm.scss'
import api from '@/api'

const StockForm = () => {
  const { getStockProductById } = useStockProducts()
  const params = useParams()
  const navigate = useNavigate()
  const [newStock, setNewStock] = useState<IStock>({
    product: ,

  })

  const addStock = useMutation({
    mutationFn: () => {
      return api.post<IStock>('stockProducts/', newStock)
    },
    onSuccess: () => {
      navigate('/cliente')
    },
    onError: (err) => {
      console.log(err.message)
    },
  })

  const updateStock = useMutation({
    mutationFn: () => {
      return api.patch<IStock>(`stockProducts/${params.id}`, newStock)
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
      const stock = getStockProductById(params.id)
      if (stock !== undefined) {
        setNewStock({
          name: stock.name,
          address: {
            neighborhood: stock.address.neighborhood,
            houseNumber: stock.address.houseNumber,
            street: stock.address.street,
            complement: stock.address.complement,
          },
          phoneNumber: stock.phoneNumber,
          email: stock.email,
          socialMedia: stock.socialMedia,
        })
      }
    }
  }, [params, getStockProductById])

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1]
      setNewStock((prevStock) => ({
        ...prevStock,
        address: {
          ...prevStock?.address,
          [addressField]: value,
        },
      }))
    } else if (
      name === 'complement' ||
      name === 'neighborhood' ||
      name === 'number' ||
      name === 'street'
    ) {
      setNewStock((prevStock) => ({
        ...prevStock,
        address: {
          ...prevStock.address,
          [name]: value,
        },
      }))
    } else {
      setNewStock({
        ...newStock,
        [name]: value,
      })
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(newStock)
    if (params.id) {
      updateStock.mutate()
    } else {
      addStock.mutate()
    }
  }

  return (
    <>
      <div className="stockFormContainer" />
      <Modal title="Formulário de Clientes">
        <form className="stockForm" onSubmit={handleSubmit}>
          <div className="stockForm__rows">
            <label className="stockForm__label">
              Nome do Cliente*:
              <input
                placeholder="Informe o nome do cliente..."
                className="stockForm__input"
                required
                type="text"
                name="name"
                value={newStock.name}
                onChange={handleInputChange}
              />
            </label>
            <label className="stockForm__label">
              Email:
              <input
                placeholder="Informe o email... (opcional)"
                className="stockForm__input"
                type="text"
                name="email"
                value={newStock.email}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="stockForm__rows">
            <label className="stockForm__label">
              Rua*:
              <input
                placeholder="Informe o nome da rua..."
                className="stockForm__input"
                required
                type="text"
                name="address.street"
                value={newStock.address.street}
                onChange={handleInputChange}
              />
            </label>
            <label className="stockForm__label">
              Número*:
              <input
                placeholder="Informe o número da casa..."
                className="stockForm__input"
                required
                type="text"
                name="address.houseNumber"
                value={newStock.address.houseNumber}
                onChange={handleInputChange}
              />
            </label>
            <label className="stockForm__label">
              Complemento:
              <input
                placeholder="Informações adicionais (opcional)..."
                className="stockForm__input"
                type="text"
                name="address.complement"
                value={newStock.address.complement}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="stockForm__rows">
            <label className="stockForm__label">
              Bairro*:
              <input
                placeholder="informe o bairro..."
                className="stockForm__input"
                required
                type="text"
                name="address.neighborhood"
                value={newStock.address.neighborhood}
                onChange={handleInputChange}
              />
            </label>
            <label className="stockForm__label">
              Telefone*:
              <input
                placeholder="Informe o telefone..."
                className="stockForm__input"
                required
                type="text"
                name="phoneNumber"
                value={newStock.phoneNumber}
                onChange={handleInputChange}
              />
            </label>
            <label className="stockForm__label">
              Instagram:
              <input
                className="stockForm__input"
                type="text"
                placeholder="Redes sociais... (opcional)"
                name="socialMedia"
                value={newStock.socialMedia}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="stockForm__actions">
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

export default StockForm
