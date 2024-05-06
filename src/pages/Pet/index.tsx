import Button from '@/components/Button'
import SearchBar from '@/components/SearchBar'
import Modal from '@/components/Modal'
import pets from '@/data/pets.json'
import IPet from '@/interfaces/IPet'
import './Pet.scss'
import PetTable from './PetTable'
import CreatePetForm from './CreatePetForm'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UpdatePetForm from './UpdatePetForm'

const Pet = () => {
  const [petsList, setPetsList] = useState(pets)
  const [isCreatingPet, setIsCreatingPet] = useState(false)
  const [isUpdatingPet, setIsUpdatingPet] = useState(false)
  const navigate = useNavigate()

  const goTo = () => {
    navigate('/relatorios/pets')
  }

  const createPet = (newPet: IPet) => {
    if (newPet.id === 0) {
      newPet.id = petsList.length + 1
    }
    setPetsList([...petsList, newPet])
    toggleModal()
  }

  const setPetToUpdate = (id: number) => {
    return petsList.find((pet) => pet.id ===id)
  }

  const updatePet = (updatedPet: IPet) => {
    const updatedPetsList = petsList.map((pet) => {
      if (pet.id === updatedPet.id) {
        return updatedPet
      }
      return pet
    })
    setPetsList(updatedPetsList)
    toggleModal(1)
  }

  const removePet = (id: number) => {
    const updatedPetsList = petsList.filter((pet) => pet.id !== id)
    setPetsList(updatedPetsList)
  }

  const toggleModal = (id?: number) => {
    if (id) {
      setPetToUpdate(id)
      setIsUpdatingPet(!isUpdatingPet)
    } else {
      setIsCreatingPet(!isCreatingPet)
    }
  }

  return (
    <div className="pet">
      <h1 className="pet__title">Gerenciamento de Pets</h1>
      <div className="pet__actions">
        <SearchBar placeholder="Pesquisar Pet..." />
        <Button text="Novo Pet" onClick={toggleModal} />
      </div>
      <PetTable remove={removePet} update={toggleModal} pets={petsList} />
      <div className="pet__reports">
        <Button onClick={goTo} text="Relatórios" />
      </div>
      <Modal title="Cadastro de Pet" isModalOpen={isCreatingPet}>
        <CreatePetForm onSubmit={createPet} onClose={toggleModal} />
      </Modal>
      <Modal title="Atualização de Pet" isModalOpen={isUpdatingPet}>
        <UpdatePetForm
          updatingPet={)}
          onSubmit={updatePet}
          onClose={toggleModal}
        />
      </Modal>
    </div>
  )
}

export default Pet
