import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import { useGroomingsQuery } from '@/api/queries/grooming'
import { formatBoolean } from '@/utils/formaters'
import { usePetsQuery } from '@/api/queries/pets'
import useGroomings from '@/hooks/useGroomings'
import IGrooming from '@/interfaces/IGrooming'
import SearchBar from '@/components/SearchBar'
import TableFlex from '@/components/TableFlex'
import { formatDate } from '@/utils/formaters'
import { formatBrl } from '@/utils/formaters'
import IColumn from '@/interfaces/IColumn'
import Loading from '@/components/Loading'
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
  const { getPetById, setPets, searchPets } = usePets()
  const { groomings, setGroomings, removeGrooming } = useGroomings()
  const {
    isSuccess: isPetsSuccess,
    data: petsData,
    isPending: isPetsPendind,
  } = usePetsQuery()
  const {
    isSuccess: isGroomingsSuccess,
    data: groomingsData,
    isPending: isGroomingsPendind,
  } = useGroomingsQuery()

  useEffect(() => {
    if (isGroomingsSuccess && isPetsSuccess) {
      setGroomings(groomingsData)
      setPets(petsData)
    }
  }, [
    groomingsData,
    isGroomingsSuccess,
    isPetsSuccess,
    petsData,
    setGroomings,
    setPets,
  ])

  const assemblingData = () => {
    return groomings.flatMap((grooming) => {
      const petData = getPetById(grooming.petId)
      return petData
        ? { ...grooming, name: petData.name, combo: petData.combo }
        : []
    })
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
      <div className="grooming__management">
        <Button
          text="< Voltar"
          colorType="goBack"
          onClick={() => navigate('/')}
        />
        <h1 className="grooming__management__title">
          Gerenciamento de Banhos e Tosas
        </h1>
      </div>
      <div className="grooming__actions">
        <SearchBar
          search={searchPets}
          placeholder="Pesquise pelo nome do pet"
        />
        <Button
          text="Novo Banho e Tosa"
          onClick={() => navigate('/banho_e_tosa/novo')}
        />
      </div>
      {isPetsPendind || isGroomingsPendind ? (
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
