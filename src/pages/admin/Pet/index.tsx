import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import { usePets, useCustomers } from '@/hooks/stores'
import { useCustomersQuery } from '@/api/queries'
import { usePetsQuery } from '@/api/queries/pets'
import { PET_COLUMNS } from '@/shared/constants'
import SearchBar from '@/components/SearchBar'
import TableFlex from '@/components/TableFlex'
import Loading from '@/components/Loading'
import Button from '@/components/Button'
import api from '@/api'
import './Pet.scss'

const Pet = () => {
  const navigate = useNavigate()
  const { petsSearch, setPets, removePet, searchPets } = usePets()
  const {
    data: petsData,
    isPending: isPetsPending,
    isSuccess: isPetsSuccess,
  } = usePetsQuery()
  const {
    data: customersData,
    isPending: isCustomersPending,
    isSuccess: isCustomersSuccess,
  } = useCustomersQuery()
  const { setCustomers } = useCustomers()

  useEffect(() => {
    if (isPetsSuccess && isCustomersSuccess) {
      setPets(petsData)
      setCustomers(customersData)
    }
  }, [
    petsData,
    customersData,
    isPetsSuccess,
    isCustomersSuccess,
    setPets,
    setCustomers,
  ])

  const updatePet = (id: string) => {
    navigate(`/pet/${id}`)
  }

  const deletePet = useMutation({
    mutationFn: (id: string) => {
      return api.delete(`pets/${id}`)
    },
    onSuccess: (_, id) => {
      removePet(id)
    },
    onError: (err) => {
      console.error(err.message)
    },
  })

  return (
    <div className="pet">
      <div className="pet__management">
        <Button text="< Voltar" onClick={() => navigate(-1)} />
        <h1 className="pet__management__title">Gerenciamento de Pets</h1>
      </div>
      <div className="pet__actions">
        <SearchBar search={searchPets} placeholder="Pesquisar pet" />
        <Button text="Novo Pet" onClick={() => navigate('/pet/novo')} />
      </div>
      {isPetsPending || isCustomersPending ? (
        <Loading />
      ) : (
        <TableFlex
          remove={deletePet.mutate}
          update={updatePet}
          data={petsSearch}
          columns={PET_COLUMNS}
        />
      )}
      <div className="pet__reports">
        <Button onClick={() => navigate('/relatorios/pet')} text="Relatórios" />
      </div>
    </div>
  )
}

export default Pet
