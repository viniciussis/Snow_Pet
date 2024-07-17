import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import { useProductsQuery } from '@/api/queries/products'
import { useStockQuery } from '@/api/queries/stock'
import useStockProducts from '@/hooks/useStock'
import { formatDate } from '@/utils/formaters'
import SearchBar from '@/components/SearchBar'
import TableFlex from '@/components/TableFlex'
import useProducts from '@/hooks/useProducts'
import IProduct from '@/interfaces/IProduct'
import Loading from '@/components/Loading'
import IColumn from '@/interfaces/IColumn'
import Button from '@/components/Button'
import IStock from '@/interfaces/IStock'
import api from '@/api'
import './Stock.scss'

const stockColumns: IColumn<IStock & IProduct>[] = [
  { id: 'name', label: 'Produto', align: 'center', minWidth: 125 },
  { id: 'quantity', label: 'Quantidade', align: 'center', minWidth: 50 },
  {
    id: 'date',
    label: 'Último Reabastecimento',
    align: 'center',
    minWidth: 75,
    formatDate,
  },
]

const Stock = () => {
  const navigate = useNavigate()
  const {
    isSuccess: isStockSuccess,
    data: stockData,
    isPending: isStockPendind,
  } = useStockQuery()
  const {
    isSuccess: isProductsSuccess,
    data: productsData,
    isPending: isProductsPendind,
  } = useProductsQuery()
  const { getProductById, setProducts, searchProducts } = useProducts()
  const { stock, setStock, removeStockProduct } = useStockProducts()

  useEffect(() => {
    if (isStockSuccess && isProductsSuccess) {
      setStock(stockData)
      setProducts(productsData)
    }
  }, [
    isProductsSuccess,
    isStockSuccess,
    productsData,
    setProducts,
    setStock,
    stockData,
  ])

  const assemblingData = () => {
    return stock.flatMap((product) => {
      const productData = getProductById(product.productId)
      return productData ? { ...product, name: productData.name } : []
    })
  }

  const updateStock = (id: string) => {
    navigate(`/estoque/${id}`)
  }

  const deleteStock = useMutation({
    mutationFn: (id: string) => {
      return api.delete(`stock/${id}`)
    },
    onSuccess: (data, id) => {
      console.log(data)
      removeStockProduct(id)
    },
    onError: (err) => {
      console.error(err.message)
    },
  })

  return (
    <div className="stock">
      <h1 className="stock__title">Estoque de Produtos</h1>
      <div className="stock__actions">
        <SearchBar
          search={searchProducts}
          placeholder="Pesquise pelo nome do produto"
        />
        <Button
          text="Reabastecer Produto"
          onClick={() => navigate('/estoque/reabastecer')}
        />
      </div>
      {isProductsPendind || isStockPendind ? (
        <Loading />
      ) : (
        <TableFlex
          remove={deleteStock.mutate}
          update={updateStock}
          columns={stockColumns}
          data={assemblingData()}
        />
      )}
      <div>
        <Button
          onClick={() => navigate('/relatorios/estoque')}
          text="Relatórios"
        />
      </div>
    </div>
  )
}

export default Stock
