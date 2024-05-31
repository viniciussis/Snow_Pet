import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import SearchBar from '@/components/SearchBar'
import TableFlex from '@/components/TableFlex'
import IProduct from '@/interfaces/IProduct'
import IColumn from '@/interfaces/IColumn'
import Button from '@/components/Button'
import http from '@/http'
import './Product.scss'

const productColumns: IColumn<IProduct>[] = [
  { id: '_id', label: 'Id', minWidth: 50 },
  { id: 'name', label: 'Nome', minWidth: 50 },
  { id: 'brand', label: 'Marca', minWidth: 50 },
  { id: 'category', label: 'Categoria', minWidth: 50 },
  { id: 'description', label: 'Descrição', minWidth: 100 },
  { id: 'price', label: 'Preço', minWidth: 50 },
  { id: 'medida', label: 'Medida', minWidth: 40 },
  { id: 'fornecedor', label: 'Fornecedor', minWidth: 75 },
]

const Product = () => {
  const [products, setProducts] = useState<IProduct[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    http.get<IProduct[]>('products/').then((response) => {
      setProducts(response.data)
    })
  }, [])

  const updateProduct = (id: string) => {
    navigate(`/produto/${id}`)
  }

  const removeProduct = (id: string) => {
    http
      .delete(`products/${id}`)
      .then((resp) => {
        console.log(resp.data.message)
        setProducts(products.filter((product) => product._id !== id))
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  return (
    <div className="product">
      <h1 className="product__title">Gerenciamento de Produtos</h1>
      <div className="product__actions">
        <SearchBar placeholder="Pesquisar Produtos..." />
        <Button text="Novo Produto" onClick={() => navigate('/produto/novo')} />
      </div>
      <TableFlex
        remove={removeProduct}
        update={updateProduct}
        data={products}
        columns={productColumns}
      />
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
