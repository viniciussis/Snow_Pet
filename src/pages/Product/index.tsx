import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import SearchBar from '@/components/SearchBar'
import TableFlex from '@/components/TableFlex'
import useProducts from '@/hooks/useProducts'
import IProduct from '@/interfaces/IProduct'
import Loading from '@/components/Loading'
import IColumn from '@/interfaces/IColumn'
import Button from '@/components/Button'
import api from '@/api'
import './Product.scss'

const productColumns: IColumn<IProduct>[] = [
  { id: 'name', label: 'Nome', minWidth: 50 },
  { id: 'brand', label: 'Marca', minWidth: 50 },
  { id: 'description', label: 'Descrição', minWidth: 100 },
  { id: 'price', label: 'Preço', minWidth: 50 },
  { id: 'measure', label: 'Medida', minWidth: 40 },
]

const fetchProducts = async () => {
  const resp = await api.get<IProduct[]>('products')
  return resp.data
}

const Product = () => {
  const { products, setProducts, removeProduct } = useProducts()
  const navigate = useNavigate()
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })

  useEffect(() => {
    if (isSuccess) {
      setProducts(data)
    }
  }, [data, isSuccess, setProducts])

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
      {isLoading ? (
        <Loading />
      ) : (
        <TableFlex
          remove={deleteProduct.mutate}
          update={updateProduct}
          data={products}
          columns={productColumns}
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
