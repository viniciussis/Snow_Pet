import Button from '@/components/Button'
import SearchBar from '@/components/SearchBar'
import pets from '@/data/pets.json'
import './Pet.scss'
import PetTable from './PetTable'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Pet = () => {
  const [petsList, setPetsList] = useState(pets)
  const navigate = useNavigate()

  const goTo = (id?: number) => {
    if (id) {
      navigate(`/pets/${id}`)
    } else {
      navigate('/relatorios/pets')
    }
  }

  const removePet = (id: number) => {
    const updatedPetsList = petsList.filter((pet) => pet.id !== id)
    setPetsList(updatedPetsList)
  }

  return (
    <div className="pet">
      <h1 className="pet__title">Gerenciamento de Pets</h1>
      <div className="pet__actions">
        <SearchBar placeholder="Pesquisar Pet..." />
        <Button text="Novo Pet" onClick={() => navigate('/pets/novo')} />
      </div>
      <PetTable remove={removePet} update={goTo} pets={petsList} />
      <div className="pet__reports">
        <Button onClick={goTo} text="Relatórios" />
      </div>
    </div>
  )
}

export default Pet
