import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import { usePetsQuery, useGroomingsQuery } from '@/api/queries'
import { usePets, useGroomings } from '@/hooks/stores'
import { GROOMING_COLUMNS } from '@/shared/constants'
import SearchBar from '@/components/SearchBar'
import TableFlex from '@/components/TableFlex'
import Loading from '@/components/Loading'
import Button from '@/components/Button'
import './Grooming.scss'
import api from '@/api'

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
        <Button text="< Voltar" onClick={() => navigate(-1)} />
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
          columns={GROOMING_COLUMNS}
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
