import Button from '@/components/Button'
import './Pet.scss'
import Table from './Table'
import SearchBar from '@/components/SearchBar'
import Modal from '@/components/Modal'
import { useState } from 'react'
import RegisterPet from './RegisterPet'

const Pet = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  const handleClick = () => {
    console.log('Botão clicado')
  }

  return (
    <div className="pet">
      <h1 className="pet__title">Gerenciamento de Pets</h1>
      <div className="pet__actions">
        <SearchBar placeholder="Pesquisar Pet..." />
        <Button text="Novo Pet" onClick={toggleModal} />
      </div>
      <Table />
      <div className="pet__reports">
        <Button onClick={handleClick} text="Relatórios" />
      </div>
      <Modal isOpen={isOpen} onClose={toggleModal}>
        <RegisterPet />
      </Modal>
    </div>
  )
}

export default Pet
