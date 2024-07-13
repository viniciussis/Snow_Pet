import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import useCategories from '@/hooks/useCategory'
import ICategory from '@/interfaces/ICategory'
import SearchBar from '@/components/SearchBar'
import TableFlex from '@/components/TableFlex'
import useProducts from '@/hooks/useProducts'
import IProduct from '@/interfaces/IProduct'
import Loading from '@/components/Loading'
import IColumn from '@/interfaces/IColumn'
import formatBrl from '@/utils/formatBrl'
import Button from '@/components/Button'
import api from '@/api'
import './Product.scss'

const productColumns: IColumn<IProduct & ICategory>[] = [
  { id: 'name', label: 'Nome', minWidth: 50 },
  { id: 'brand', label: 'Marca', minWidth: 50, align: 'center' },
  { id: 'description', label: 'Descrição', minWidth: 100, align: 'center' },
  { id: 'price', label: 'Preço', minWidth: 50, align: 'center', formatBrl },
  { id: 'measure', label: 'Medida', minWidth: 40, align: 'center' },
  { id: 'label', label: 'Categoria', minWidth: 50, align: 'center' },
]

const fetchCategories = async () => {
  const resp = await api.get<ICategory[]>('categories')
  return resp.data
}

const fetchProducts = async () => {
  const resp = await api.get<IProduct[]>('products')
  return resp.data
}

const Product = () => {
  const { products, setProducts, removeProduct } = useProducts()
  const { setCategories, getCategoryById } = useCategories()
  const navigate = useNavigate()

  const productQuery = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })
  const categoryQuery = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  })

  useEffect(() => {
    if (productQuery.isSuccess) {
      setProducts(productQuery.data)
    }
    if (categoryQuery.isSuccess) {
      setCategories(categoryQuery.data)
    }
  }, [
    categoryQuery.data,
    categoryQuery.isSuccess,
    productQuery.data,
    productQuery.isSuccess,
    setCategories,
    setProducts,
  ])

  const assemblingData = () => {
    const tableData = products.map((product) => {
      const categoryData = getCategoryById(product.categoryId)
      return {
        ...product,
        label: categoryData?.label,
      }
    })
    return tableData
  }

  const updateProduct = (id: string) => {
    navigate(`/produto/${id}`)
  }

  const deleteProduct = useMutation({
    mutationFn: (id: string) => {
      return api.delete(`products/${id}`)
    },
    onSuccess: (data, id) => {
      console.log(data)
      removeProduct(id)
    },
    onError: (err) => {
      console.error(err.message)
    },
  })

  return (
    <div className="product">
      <h1 className="product__title">Gerenciamento de Produtos</h1>
      <div className="product__actions">
        <SearchBar placeholder="Pesquisar Produtos..." />
        <Button text="Novo Produto" onClick={() => navigate('/produto/novo')} />
      </div>
      {categoryQuery.isLoading ? (
        <Loading />
      ) : (
        <TableFlex
          columns={productColumns}
          data={assemblingData()}
          remove={deleteProduct.mutate}
          update={updateProduct}
        />
      )}
      <div className="product__reports">
        <Button
          onClick={() => navigate('/relatorios/produtos')}
          text="Relatórios"
        />
      </div>
    </div>
  )
}

export default Product
