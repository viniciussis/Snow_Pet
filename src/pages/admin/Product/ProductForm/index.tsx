import { useNavigate, useParams } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import { useProducts, useCategories } from '@/hooks/stores'
import { Product, productSchema } from '@/shared/schemas'
import { IProduct } from '@/shared/interfaces'
import Select from '@/components/Select'
import Button from '@/components/Button'
import Field from '@/components/Field'
import Modal from '@/components/Modal'
import './ProductForm.scss'
import api from '@/api'

const ProductForm = () => {
  const { getProductById } = useProducts()
  const navigate = useNavigate()
  const params = useParams()

  const product = params.id ? getProductById(params.id) : undefined
  const { categories } = useCategories()
  const categoriesList = categories.map((category) => ({
    value: category.id as string,
    label: category.label,
  }))

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm<Product>({
    defaultValues: product ?? {
      name: '',
      price: 0,
      measure: '',
      brand: '',
      categoryId: '',
      description: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(productSchema),
  })

  const addProduct = useMutation({
    mutationFn: (data: Product) => {
      return api.post<IProduct>('products', data)
    },
    onSuccess: () => {
      navigate('/produto')
    },
    onError: (err) => {
      console.log(err.message)
    },
  })

  const updateProduct = useMutation({
    mutationFn: (data: Product) => {
      return api.patch<IProduct>(`products/${params.id}`, data)
    },
    onSuccess: () => {
      navigate('/produto')
    },
    onError: (err) => {
      console.log(err.message)
    },
  })

  const submitting = (data: Product) => {
    if (params.id) {
      updateProduct.mutate(data)
    } else {
      addProduct.mutate(data)
    }
  }

  return (
    <>
      <div className="productFormContainer" />
      <Modal title="Formulário de Produto">
        <form
          className="productForm"
          noValidate
          onSubmit={handleSubmit(submitting)}
        >
          <div className="productForm__rows">
            <Field
              label="Nome*"
              {...register('name')}
              errors={errors.name?.message}
            />
            <Field
              label="Marca*"
              {...register('brand')}
              errors={errors.brand?.message}
            />
            <Select
              label="Categoria*"
              options={categoriesList}
              {...register('categoryId')}
              errors={errors.categoryId?.message}
            />
          </div>
          <div className="productForm__rows">
            <Field
              label="Preço*"
              type="number"
              min={0}
              errors={errors.price?.message}
              {...register('price', { valueAsNumber: true })}
            />
            <Field
              label="Unidade de medida*"
              {...register('measure')}
              errors={errors.measure?.message}
            />
          </div>
          <Field
            label="Descrição"
            {...register('description')}
            errors={errors.description?.message}
          />
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
            <Button
              type="submit"
              text="Cadastrar"
              colorType="success"
              disabled={!isDirty || isSubmitting || !isValid}
            />
          </div>
        </form>
      </Modal>
    </>
  )
}

export default ProductForm
