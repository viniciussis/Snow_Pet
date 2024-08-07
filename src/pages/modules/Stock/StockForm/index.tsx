import { useNavigate, useParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'

import useStockProducts from '@/hooks/useStock'
import IStock from '@/interfaces/IStock'
import Button from '@/components/Button'
import Modal from '@/components/Modal'
import './StockForm.scss'
import api from '@/api'
import useProducts from '@/hooks/useProducts'

const StockForm = () => {
  const params = useParams()
  const navigate = useNavigate()
  const { getProductById } = useProducts()
  const [productName, setProductName] = useState<string | null>()
  const { getStockProductById } = useStockProducts()
  const [newStock, setNewStock] = useState<IStock>({
    date: new Date().toUTCString(),
    productId: '',
    quantity: 0,
  })

  const refillStock = useMutation({
    mutationFn: () => {
      return api.patch<IStock>(`stock/${params.id}`, {
        quantity: Number(newStock.quantity),
      })
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
        const product = getProductById(stock.productId)
        if (product) {
          setProductName(product.name)
        }
      }
    }
  }, [params, getStockProductById, getProductById])

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
      refillStock.mutate()
    }
  }

  return (
    <>
      <div className="stockFormContainer" />
      <Modal title={`Reabastecer Produto: ${productName}`}>
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
