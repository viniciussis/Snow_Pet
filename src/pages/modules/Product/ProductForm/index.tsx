import { useNavigate, useParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'

import { useProducts, useCategories } from '@/hooks/stores'
import { IProduct } from '@/shared/interfaces'
import Button from '@/components/Button'
import Modal from '@/components/Modal'
import './ProductForm.scss'
import api from '@/api'

const ProductForm = () => {
  const params = useParams()
  const navigate = useNavigate()
  const { getProductById } = useProducts()
  const { categories: categoriesList, getCategoryById } = useCategories()
  const [newProduct, setNewProduct] = useState<IProduct>({
    name: '',
    brand: '',
    price: 0,
    measure: '',
    categoryId: '',
    description: '',
  })

  const addProduct = useMutation({
    mutationFn: () => {
      console.log(newProduct)
      return api.post<IProduct>('products', newProduct)
    },
    onSuccess: () => {
      navigate('/produto')
    },
    onError: (err) => {
      console.log(err.message)
    },
  })

  const updateProduct = useMutation({
    mutationFn: () => {
      console.log(newProduct)
      const { id, ...updatedProduct } = newProduct
      return api.patch<IProduct>(`products/${params.id}`, { ...updatedProduct })
    },
    onSuccess: () => {
      navigate('/produto')
    },
    onError: (err) => {
      console.log(err.message)
    },
  })

  useEffect(() => {
    if (params.id) {
      const product = getProductById(params.id)
      if (product !== undefined) {
        setNewProduct({ ...product })
      }
    }
  }, [getCategoryById, getProductById, params])

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target
    if (name === 'price') {
      setNewProduct({
        ...newProduct,
        [name]: Number(value),
      })
    } else {
      setNewProduct({
        ...newProduct,
        [name]: value,
      })
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (params.id) {
      updateProduct.mutate()
    } else {
      addProduct.mutate()
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
              <select
                className="productForm__select"
                required
                name="categoryId"
                value={newProduct.categoryId}
                onChange={handleInputChange}
              >
                <option value="">Selecione a categoria do produto...</option>
                {categoriesList.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.label}
                  </option>
                ))}
              </select>
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
                min={0}
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
                name="measure"
                value={newProduct.measure}
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
              onClick={() => navigate('/produto/novo/categoria')}
              text="Adicionar Categoria"
              colorType="primary"
            />
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
