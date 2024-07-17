import { useNavigate, useParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'

import useStockProducts from '@/hooks/useStock'
import IStock from '@/interfaces/IStock'
import Button from '@/components/Button'
import Modal from '@/components/Modal'
import './StockForm.scss'
import api from '@/api'

const StockForm = () => {
  const params = useParams()
  const navigate = useNavigate()
  const { getStockProductById } = useStockProducts()
  const [newStock, setNewStock] = useState<IStock>({
    date: new Date().toUTCString(),
    productId: '',
    quantity: 0,
  })

  const addStock = useMutation({
    mutationFn: () => {
      return api.post<IStock>('stock/', newStock)
    },
    onSuccess: () => {
      navigate('/estoque')
    },
    onError: (err) => {
      console.log(err.message)
    },
  })

  const updateStock = useMutation({
    mutationFn: () => {
      return api.patch<IStock>(`stock/${params.id}`, newStock)
    },
    onSuccess: () => {
      navigate('/estoque')
    },
    onError: (err) => {
      console.log(err.message)
    },
  })

  useEffect(() => {
    if (params.id) {
      const stock = getStockProductById(params.id)
      if (stock !== undefined) {
        setNewStock(stock)
      }
    }
  }, [params, getStockProductById])

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target
    setNewStock({
      ...newStock,
      [name]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (params.id) {
      updateStock.mutate()
    } else {
      addStock.mutate()
    }
  }

  return (
    <>
      <div className="stockFormContainer" />
      <Modal title={`${newStock.productId}`}>
        <form className="stockForm" onSubmit={handleSubmit}>
          <div className="stockForm__rows">
            <label className="productForm__label">
              Quantidade*:
              <input
                placeholder="Informe a quantidade do produto..."
                className="stockForm__input"
                required
                type="number"
                min={0}
                name="quantity"
                value={newStock.quantity}
                onChange={handleInputChange}
              />
            </label>
            <label className="serviceForm__label">
              Último Reabastecimento*:
              <input
                placeholder="informe a data do último abastecimento..."
                className="stockForm__input"
                required
                type="datetime-local"
                name="date"
                value={newStock.date}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="stockForm__actions">
            <Button
              text="Cancelar"
              colorType="fail"
              onClick={() => navigate('/estoque')}
            />
            <Button type="submit" text="Cadastrar" colorType="success" />
          </div>
        </form>
      </Modal>
    </>
  )
}

export default StockForm
