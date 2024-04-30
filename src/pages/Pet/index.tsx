import Button from '@/components/Button'
import SearchBar from '@/components/SearchBar'
import Modal from '@/components/Modal'
import pets from '@/data/pets.json'
import IPet from '@/interfaces/IPet'
import './Pet.scss'
import Table from './PetTable'
import PetForm from './PetForm'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Pet = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [petsList, setPetsList] = useState(pets)
  const navigate = useNavigate()

  const goTo = () => {
    navigate('/relatorios/pets')
  }

  const addPet = (newPet: IPet) => {
    if (newPet.id === 0) {
      newPet.id = petsList.length + 1
    }
    setPetsList([...petsList, newPet])
    toggleModal()
  }

  const removePet = (id: number) => {
    const updatedPetsList = petsList.filter((pet) => pet.id !== id)
    setPetsList(updatedPetsList)
  }

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <div className="pet">
      <h1 className="pet__title">Gerenciamento de Pets</h1>
      <div className="pet__actions">
        <SearchBar placeholder="Pesquisar Pet..." />
        <Button text="Novo Pet" onClick={toggleModal} />
      </div>
      <Table remove={removePet} pets={petsList} />
      <div className="pet__reports">
        <Button onClick={goTo} text="Relatórios" />
      </div>
      <Modal isModalOpen={isModalOpen}>
        <PetForm onSubmit={addPet} onClose={toggleModal} />
      </Modal>
    </div>
  )
}

export default Pet
