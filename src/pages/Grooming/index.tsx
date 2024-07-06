import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import useGroomings from '@/hooks/useGroomings'
import IGrooming from '@/interfaces/IGrooming'
import SearchBar from '@/components/SearchBar'
import TableFlex from '@/components/TableFlex'
import IColumn from '@/interfaces/IColumn'
import Loading from '@/components/Loading'
import Button from '@/components/Button'
import './Grooming.scss'
import api from '@/api'

const groomingColumns: IColumn<IGrooming>[] = [
  { id: 'petId', label: 'Nome do Pet', align: 'center', minWidth: 50 },
  { id: 'type', label: 'Tipo', align: 'center', minWidth: 50 },
  { id: 'price', label: 'Preço', minWidth: 50 },
  { id: 'petId', label: 'É Pacote?', align: 'center', minWidth: 50 },
  { id: 'date', label: 'Data', align: 'center', minWidth: 75 },
]

const fetchGroomings = async () => {
  const resp = await api.get<IGrooming[]>('groomings/')
  return resp.data
}

const Grooming = () => {
  const { groomings, setGroomings, removeGrooming } = useGroomings()
  const navigate = useNavigate()
  const { isLoading, data, isSuccess } = useQuery({
    queryKey: ['groomings'],
    queryFn: fetchGroomings,
  })

  useEffect(() => {
    if (isSuccess) {
      setGroomings(data)
    }
  }, [data, isSuccess, setGroomings])

  const updateGrooming = (id: string) => {
    navigate(`/banho_e_tosa/${id}`)
  }

  const deleteGrooming = useMutation({
    mutationFn: (id: string) => {
      return api.delete(`groomings/${id}`)
    },
    onSuccess: (data, id) => {
      console.log(data)
      removeGrooming(id)
    },
    onError: (err) => {
      console.error(err.message)
    },
  })

  return (
    <div className="grooming">
      <h1 className="grooming__title">Gerenciamento de Banhos e Tosas</h1>
      <div className="grooming__actions">
        <SearchBar placeholder="Pesquisar Banhos e Tosas..." />
        <Button
          text="Novo Banho e Tosa"
          onClick={() => navigate('/banho_e_tosa/novo')}
        />
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <TableFlex
          remove={deleteGrooming.mutate}
          update={updateGrooming}
          data={groomings}
          columns={groomingColumns}
        />
      )}
      <div className="grooming__reports">
        <Button
          onClick={() => navigate('/relatorios/banho_e_tosa')}
          text="Relatórios"
        />
      </div>
    </div>
  )
}

export default Grooming
