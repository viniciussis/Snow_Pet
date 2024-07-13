import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import { useGroomingsQuery } from '@/api/queries/grooming'
import formatBoolean from '@/utils/formatBoolean'
import { usePetsQuery } from '@/api/queries/pets'
import useGroomings from '@/hooks/useGroomings'
import IGrooming from '@/interfaces/IGrooming'
import SearchBar from '@/components/SearchBar'
import TableFlex from '@/components/TableFlex'
import formatDate from '@/utils/formatDate'
import IColumn from '@/interfaces/IColumn'
import Loading from '@/components/Loading'
import formatBrl from '@/utils/formatBrl'
import Button from '@/components/Button'
import usePets from '@/hooks/usePets'
import IPet from '@/interfaces/IPet'
import './Grooming.scss'
import api from '@/api'

const groomingColumns: IColumn<IGrooming & IPet>[] = [
  { id: 'name', label: 'Nome do Pet', align: 'center', minWidth: 50 },
  { id: 'type', label: 'Tipo', align: 'center', minWidth: 75 },
  { id: 'price', label: 'Preço', minWidth: 50, align: 'center', formatBrl },
  {
    id: 'combo',
    label: 'É Pacote?',
    align: 'center',
    minWidth: 50,
    formatBoolean,
  },
  { id: 'date', label: 'Data', align: 'center', minWidth: 75, formatDate },
]

const Grooming = () => {
  const navigate = useNavigate()
  const petsQuery = usePetsQuery()
  const { getPetById, setPets } = usePets()
  const groomingsQuery = useGroomingsQuery()
  const { groomings, setGroomings, removeGrooming } = useGroomings()

  useEffect(() => {
    if (groomingsQuery.isSuccess && petsQuery.isSuccess) {
      setGroomings(groomingsQuery.data)
      setPets(petsQuery.data)
    }
  }, [
    groomingsQuery.data,
    groomingsQuery.isSuccess,
    petsQuery.data,
    petsQuery.isSuccess,
    setGroomings,
    setPets,
  ])

  const assemblingData = () => {
    const tableData = groomings.map((grooming) => {
      const petData = getPetById(grooming.petId)
      return {
        ...grooming,
        name: petData?.name,
        combo: petData?.combo,
      }
    })
    return tableData
  }

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
      {groomingsQuery.isLoading ? (
        <Loading />
      ) : (
        <TableFlex
          remove={deleteGrooming.mutate}
          update={updateGrooming}
          data={assemblingData()}
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
