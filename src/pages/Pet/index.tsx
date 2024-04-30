import Button from '@/components/Button'
import './Pet.scss'
import Table from './Table'
import SearchBar from '@/components/SearchBar'
import Modal from '@/components/Modal'
import { useEffect, useState } from 'react'
import PetForm from './PetForm'
import pets from '@/data/pets.json'
import IPet from '@/interfaces/IPet'

const Pet = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [petsList, setPetsList] = useState(pets)

  useEffect(() => {
  }, [petsList])
  
  const addPet = (newPet: IPet) => {
    setPetsList([...petsList, newPet])
  }

  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  const handleClick = () => {
  }

  return (
    <div className="pet">
      <h1 className="pet__title">Gerenciamento de Pets</h1>
      <div className="pet__actions">
        <SearchBar placeholder="Pesquisar Pet..." />
        <Button text="Novo Pet" onClick={toggleModal} />
      </div>
      <Table pets={petsList} />
      <div className="pet__reports">
        <Button onClick={handleClick} text="Relatórios" />
      </div>
      <Modal isOpen={isOpen}>
        <PetForm onSubmit={addPet} onClose={toggleModal} />
      </Modal>
    </div>
  )
}

export default Pet
