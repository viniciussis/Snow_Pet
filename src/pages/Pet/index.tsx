import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import SearchBar from '@/components/SearchBar'
import TableFlex from '@/components/TableFlex'
import IColumn from '@/interfaces/IColumn'
import Button from '@/components/Button'
import IPet from '@/interfaces/IPet'
import api from '@/api'
import './Pet.scss'

const petColumns: IColumn<IPet>[] = [
  { id: 'name', label: 'Nome', minWidth: 50 },
  { id: 'specie', label: 'Espécie', align: 'center', minWidth: 50 },
  { id: 'breed', label: 'Raça', align: 'center', minWidth: 75 },
  { id: 'size', label: 'Porte', align: 'center', minWidth: 50 },
  { id: 'gender', label: 'Sexo', align: 'center', minWidth: 50 },
  { id: 'health_problems', label: 'Problemas de Saúde', minWidth: 100 },
  { id: 'allergies', label: 'Alergias', minWidth: 75 },
  { id: 'additional_info', label: 'Informações Adicionais', minWidth: 100 },
]

const Pet = () => {
  const [pets, setPets] = useState<IPet[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    api.get<IPet[]>('pets/').then((response) => {
      setPets(response.data)
    })
  }, [])

  const updatePet = (id: string) => {
    navigate(`/pet/${id}`)
  }

  const removePet = (id: string) => {
    api
      .delete(`pets/${id}`)
      .then((resp) => {
        console.log(resp.data.message)
        setPets(pets.filter((pet) => pet.id !== id))
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  return (
    <div className="pet">
      <h1 className="pet__title">Gerenciamento de Pets</h1>
      <div className="pet__actions">
        <SearchBar placeholder="Pesquisar Pet..." />
        <Button text="Novo Pet" onClick={() => navigate('/pet/novo')} />
      </div>
      <TableFlex
        remove={removePet}
        update={updatePet}
        data={pets}
        columns={petColumns}
      />
      <div className="pet__reports">
        <Button onClick={() => navigate('/relatorios/pet')} text="Relatórios" />
      </div>
    </div>
  )
}

export default Pet
