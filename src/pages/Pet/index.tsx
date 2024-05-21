import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import SearchBar from '@/components/SearchBar'
import Button from '@/components/Button'
import petsList from '@/data/pets.json'
import './Pet.scss'
import TableFlex from '@/components/TableFlex'
import IPetColumn from '@/interfaces/IPetColumn'

const petColumns: IPetColumn[] = [
  { id: 'name', label: 'Nome', minWidth: 100 },
  { id: 'owner', label: 'Dono', minWidth: 150 },
  { id: 'specie', label: 'Espécie', align: 'center', minWidth: 50 },
  { id: 'breed', label: 'Raça', align: 'center', minWidth: 100 },
  { id: 'size', label: 'Porte', align: 'center', minWidth: 50 },
  { id: 'gender', label: 'Sexo', align: 'center', minWidth: 50 },
  { id: 'healthProblems', label: 'Problemas de Saúde', minWidth: 125 },
  { id: 'allergies', label: 'Alergias', minWidth: 100 },
  { id: 'additionalInfo', label: 'Informações Adicionais', minWidth: 175 },
]

const Pet = () => {
  const [pets, setPets] = useState(petsList)
  const navigate = useNavigate()

  const updatePet = (id: number) => {
    navigate(`/pet/${id}`)
  }

  const removePet = (id: number) => {
    const updatedPets = pets.filter((pet) => pet.id !== id)
    setPets(updatedPets)
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
        items={pets}
        columns={petColumns}
      />
      <div className="pet__reports">
        <Button onClick={() => navigate('/relatorios/pet')} text="Relatórios" />
      </div>
    </div>
  )
}

export default Pet
