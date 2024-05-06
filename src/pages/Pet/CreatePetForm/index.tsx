import IPet from '@/interfaces/IPet'
import './CreatePetForm.scss'
import React, { useState } from 'react'
import Button from '@/components/Button'

interface CreatePreatePetFormProps {
  onSubmit: (newPet: IPet ) => void
  onClose: () => void
}

const CreatePetForm: React.FC<CreatePreatePetFormProps> = ({ onClose, onSubmit }) => {
  const [newPet, setNewPet] = useState<IPet>({
    id: 0,
    name: '',
    owner: '',
    specie: '',
    breed: '',
    size: 'Pequeno',
    gender: 'Macho',
    healthProblems: '',
    allergies: '',
    additionalInfo: '',
  })

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target
    setNewPet({
      ...newPet,
      [name]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(newPet)
  }

  return (
    <form className="createPetForm" onSubmit={handleSubmit}>
      <div className="createPetForm__rows">
        <label className="createPetForm__label">
          Nome do Pet:
          <input
            placeholder="Informe o nome do pet..."
            className="createPetForm__input"
            required
            type="text"
            name="name"
            value={newPet.name}
            onChange={handleInputChange}
          />
        </label>
        <label className="createPetForm__label">
          Nome do Dono:
          <input
            placeholder="Informe o nome do dono do pet..."
            className="createPetForm__input"
            required
            type="text"
            name="owner"
            value={newPet.owner}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div className="createPetForm__rows">
        <label className="createPetForm__label">
          Animal:
          <select
            className="createPetForm__select"
            required
            name="specie"
            value={newPet.specie}
            onChange={handleInputChange}
          >
            <option value="">Selecione</option>
            <option value="Cachorro">Cachorro</option>
            <option value="Gato">Gato</option>
          </select>
        </label>
        <label className="createPetForm__label">
          Porte:
          <select
            className="createPetForm__select"
            required
            name="size"
            value={newPet.size}
            onChange={handleInputChange}
          >
            <option value="">Selecione</option>
            <option value="Pequeno">Pequeno</option>
            <option value="Médio">Médio</option>
            <option value="Grande">Grande</option>
          </select>
        </label>
        <label className="createPetForm__label">
          Raça:
          <input
            placeholder="informe a raça do pet..."
            className="createPetForm__input"
            required
            type="text"
            name="breed"
            value={newPet.breed}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <label className="createPetForm__label">
        Possui problemas de saúde?
        <input
          placeholder="Se sim, quais?"
          className="createPetForm__input"
          type="text"
          name="healthProblems"
          value={newPet.healthProblems}
          onChange={handleInputChange}
        />
      </label>
      <label className="createPetForm__label">
        Possuí alergias?
        <input
          placeholder="Se sim, quais?"
          className="createPetForm__input"
          type="text"
          name="allergies"
          value={newPet.allergies}
          onChange={handleInputChange}
        />
      </label>
      <label className="createPetForm__label">
        Informações adicionais:
        <input
          className="createPetForm__input"
          type="text"
          placeholder="Coloque aqui informações adicionais sobre o pet..."
          name="additionalInfo"
          value={newPet.additionalInfo}
          onChange={handleInputChange}
        />
      </label>
      <div className="createPetForm__actions">
        <Button text="Cancelar" onClick={onClose} />
        <Button type="submit" text="Cadastrar" />
      </div>
    </form>
  )
}

export default CreatePetForm
