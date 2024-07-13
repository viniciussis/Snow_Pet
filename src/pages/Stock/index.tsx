import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import useStockProducts from '@/hooks/useStock'
import SearchBar from '@/components/SearchBar'
import TableFlex from '@/components/TableFlex'
import Loading from '@/components/Loading'
import IColumn from '@/interfaces/IColumn'
import Button from '@/components/Button'
import IStock from '@/interfaces/IStock'
import api from '@/api'
import './Stock.scss'
import IProduct from '@/interfaces/IProduct'
import useProducts from '@/hooks/useProducts'
import formatDate from '@/utils/formatDate'

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

const fetchStockProducts = async () => {
  const resp = await api.get<IStock[]>('stock')
  return resp.data
}

const Stock = () => {
  const navigate = useNavigate()
  const { setStock, stock, removeStockProduct } = useStockProducts()
  const { getProductById } = useProducts()
  const { isSuccess, isLoading, data } = useQuery({
    queryKey: ['stock'],
    queryFn: fetchStockProducts,
  })

  useEffect(() => {
    if (isSuccess) {
      setStock(data)
    }
  }, [data, isSuccess, setStock])

  const assemblingData = () => {
    const tableData = stock.map((product) => {
      const productData = getProductById(product.productId)
      return {
        ...product,
        name: productData?.name,
      }
    })
    return tableData
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
        <SearchBar placeholder="Pesquisar no Estoque..." />
        <Button
          text="Reabastecer Produto"
          onClick={() => navigate('/estoque/reabastecer')}
        />
      </div>
      {isLoading ? (
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
