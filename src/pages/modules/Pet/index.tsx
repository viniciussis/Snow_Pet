import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import { useCustomersQuery } from '@/api/queries/customers'
import { usePetsQuery } from '@/api/queries/pets'
import useCustomers from '@/hooks/useCustomers'
import SearchBar from '@/components/SearchBar'
import TableFlex from '@/components/TableFlex'
import IColumn from '@/interfaces/IColumn'
import Loading from '@/components/Loading'
import Button from '@/components/Button'
import usePets from '@/hooks/usePets'
import IPet from '@/interfaces/IPet'
import api from '@/api'
import './Pet.scss'

const petColumns: IColumn<IPet>[] = [
  { id: 'name', label: 'Nome', minWidth: 50 },
  { id: 'specie', label: 'Espécie', align: 'center', minWidth: 50 },
  { id: 'breed', label: 'Raça', align: 'center', minWidth: 75 },
  { id: 'size', label: 'Porte', align: 'center', minWidth: 50 },
  { id: 'gender', label: 'Sexo', align: 'center', minWidth: 50 },
  {
    id: 'healthProblems',
    label: 'Problemas de Saúde',
    align: 'center',
    minWidth: 100,
  },
  { id: 'allergies', label: 'Alergias', align: 'center', minWidth: 75 },
  {
    id: 'additionalInfo',
    label: 'Informações Adicionais',
    align: 'center',
    minWidth: 100,
  },
]

const Pet = () => {
  const navigate = useNavigate()
  const { petsSearch, setPets, removePet, searchPets } = usePets()
  const { setCustomers } = useCustomers()
  const customersQuery = useCustomersQuery()
  const { isPending, data, isSuccess } = usePetsQuery()

  useEffect(() => {
    if (isSuccess && customersQuery.isSuccess) {
      setPets(data)
      setCustomers(customersQuery.data)
    }
  }, [
    customersQuery.data,
    customersQuery.isSuccess,
    data,
    isSuccess,
    setCustomers,
    setPets,
  ])

  const updatePet = (id: string) => {
    navigate(`/pet/${id}`)
  }

  const deletePet = useMutation({
    mutationFn: (id: string) => {
      return api.delete(`pets/${id}`)
    },
    onSuccess: (data, id) => {
      console.log(data)
      removePet(id)
    },
    onError: (err) => {
      console.error(err.message)
    },
  })

  return (
    <div className="pet">
      <div className="pet__management">
        <Button
          text="< Voltar"
          colorType="goBack"
          onClick={() => navigate(-1)}
        />
        <h1 className="pet__management__title">Gerenciamento de Pets</h1>
      </div>
      <div className="pet__actions">
        <SearchBar search={searchPets} placeholder="Pesquisar pet" />
        <Button text="Novo Pet" onClick={() => navigate('/pet/novo')} />
      </div>
      {isPending ? (
        <Loading />
      ) : (
        <TableFlex
          remove={deletePet.mutate}
          update={updatePet}
          data={petsSearch}
          columns={petColumns}
        />
      )}
      <div className="pet__reports">
        <Button onClick={() => navigate('/relatorios/pet')} text="Relatórios" />
      </div>
    </div>
  )
}

export default Pet
