import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import IProduct from '@/interfaces/IProduct'
import Button from '@/components/Button'
import Modal from '@/components/Modal'
import http from '@/http'
import './ProductForm.scss'

const ProductForm = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [newProduct, setNewProduct] = useState<IProduct>({
    name: '',
    brand: '',
    category: '',
    medida: '',
    price: 0,
    description: '',
    fornecedor: '',
  })

  useEffect(() => {
    if (params.id) {
      http
        .get(`products/${params.id}`)
        .then((resp) => setNewProduct(resp.data))
        .catch((err) => console.log(err.message))
    }
  }, [params])

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target
    setNewProduct({
      ...newProduct,
      [name]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (params.id) {
      http
        .put(`products/${params.id}`, {
          ...newProduct,
        })
        .then((resp) => {
          navigate('/produto')
          console.log(resp.data.message)
        })
        .catch((err) => {
          console.log(err.message)
        })
    } else {
      http
        .post('products/', {
          ...newProduct,
        })
        .then((resp) => {
          console.log(resp)
          navigate('/produto')
        })
        .catch((err) => console.log(err.message))
    }
  }

  return (
    <>
      <div className="productFormContainer" />
      <Modal title="Formulário de Produto">
        <form className="productForm" onSubmit={handleSubmit}>
          <div className="productForm__rows">
            <label className="productForm__label">
              Nome do Produto*:
              <input
                placeholder="Informe o nome do produto..."
                className="productForm__input"
                required
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
              />
            </label>
            <label className="productForm__label">
              Marca*:
              <input
                placeholder="Informe a marca do produto..."
                className="productForm__input"
                required
                type="text"
                name="brand"
                value={newProduct.brand}
                onChange={handleInputChange}
              />
            </label>
            <label className="productForm__label">
              Categoria*:
              <input
                placeholder="Informe a categoria do produto..."
                className="productForm__input"
                required
                type="text"
                name="category"
                value={newProduct.category}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="productForm__rows">
            <label className="productForm__label">
              Preço*:
              <input
                placeholder="Informe o preço do produto..."
                className="productForm__input"
                required
                type="number"
                name="price"
                value={newProduct.price}
                onChange={handleInputChange}
              />
            </label>
            <label className="productForm__label">
              Unidade de Medida*:
              <input
                placeholder="informe a unidade de medida do produto..."
                className="productForm__input"
                required
                type="text"
                name="medida"
                value={newProduct.medida}
                onChange={handleInputChange}
              />
            </label>
            <label className="productForm__label">
              Fornecedor:
              <input
                placeholder="Informe o fornecedor... (opcional)"
                className="productForm__input"
                type="text"
                name="fornecedor"
                value={newProduct.fornecedor}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <label className="productForm__label">
            Descrição:
            <input
              placeholder="Descreva o produto... (opcional)"
              className="productForm__input"
              type="text"
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
            />
          </label>
          <div className="productForm__actions">
            <Button
              text="Cancelar"
              colorType="fail"
              onClick={() => navigate('/produto')}
            />
            <Button type="submit" text="Cadastrar" colorType="success" />
          </div>
        </form>
      </Modal>
    </>
  )
}

export default ProductForm
