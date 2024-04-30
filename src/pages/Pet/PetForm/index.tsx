import IPet from '@/interfaces/IPet'
import './PetForm.scss'
import React, { useState } from 'react'
import Button from '@/components/Button'

interface PetFormProps {
  onSubmit: (newPet: IPet ) => void
  onClose: () => void
}

const PetForm: React.FC<PetFormProps> = ({ onClose, onSubmit }) => {
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
    <form className="petForm" onSubmit={handleSubmit}>
      <h1 className="petForm__title">Cadastro de Pet</h1>
      <div className="petForm__rows">
        <label className="petForm__label">
          Nome do Pet:
          <input
            placeholder="Informe o nome do pet..."
            className="petForm__input"
            required
            type="text"
            name="name"
            value={newPet.name}
            onChange={handleInputChange}
          />
        </label>
        <label className="petForm__label">
          Nome do Dono:
          <input
            placeholder="Informe o nome do dono do pet..."
            className="petForm__input"
            required
            type="text"
            name="owner"
            value={newPet.owner}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div className="petForm__rows">
        <label className="petForm__label">
          Animal:
          <select
            className="petForm__select"
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
        <label className="petForm__label">
          Porte:
          <select
            className="petForm__select"
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
        <label className="petForm__label">
          Raça:
          <input
            placeholder="informe a raça do pet..."
            className="petForm__input"
            required
            type="text"
            name="breed"
            value={newPet.breed}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <label className="petForm__label">
        Possui problemas de saúde?
        <input
          placeholder="Se sim, quais?"
          className="petForm__input"
          type="text"
          name="healthProblems"
          value={newPet.healthProblems}
          onChange={handleInputChange}
        />
      </label>
      <label className="petForm__label">
        Possuí alergias?
        <input
          placeholder="Se sim, quais?"
          className="petForm__input"
          type="text"
          name="allergies"
          value={newPet.allergies}
          onChange={handleInputChange}
        />
      </label>
      <label className="petForm__label">
        Informações adicionais:
        <input
          className="petForm__input"
          type="text"
          placeholder="Coloque aqui informações adicionais sobre o pet..."
          name="additionalInfo"
          value={newPet.additionalInfo}
          onChange={handleInputChange}
        />
      </label>
      <div className="petForm__actions">
        <Button text="Cancelar" onClick={onClose} />
        <Button type="submit" text="Cadastrar" />
      </div>
    </form>
  )
}

export default PetForm
