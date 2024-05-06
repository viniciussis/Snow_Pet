import IPet from '@/interfaces/IPet'
import './UpdatePetForm.scss'
import React, { useState } from 'react'
import Button from '@/components/Button'

interface UpdatePetFormProps {
  onSubmit: (updatedPet: IPet ) => void
  onClose: () => void
  updatingPet: IPet
}

const UpdatePetForm: React.FC<UpdatePetFormProps> = ({ onClose, onSubmit, updatingPet }) => {
  const [updatedPet, setUpdatedPet] = useState<IPet>(updatingPet)

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target
    setUpdatedPet({
      ...updatedPet,
      [name]: value,
    })
  }

  const onSubmitting = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(updatedPet)
  }

  return (
    <form className="UpdatePetForm" onSubmit={onSubmitting}>
      <div className="UpdatePetForm__rows">
        <label className="UpdatePetForm__label">
          Nome do Pet:
          <input
            placeholder="Informe o nome do pet..."
            className="UpdatePetForm__input"
            required
            type="text"
            name="name"
            value={updatedPet.name}
            onChange={handleInputChange}
          />
        </label>
        <label className="UpdatePetForm__label">
          Nome do Dono:
          <input
            placeholder="Informe o nome do dono do pet..."
            className="UpdatePetForm__input"
            required
            type="text"
            name="owner"
            value={updatedPet.owner}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div className="UpdatePetForm__rows">
        <label className="UpdatePetForm__label">
          Animal:
          <select
            className="UpdatePetForm__select"
            required
            name="specie"
            value={updatedPet.specie}
            onChange={handleInputChange}
          >
            <option value="">Selecione</option>
            <option value="Cachorro">Cachorro</option>
            <option value="Gato">Gato</option>
          </select>
        </label>
        <label className="UpdatePetForm__label">
          Porte:
          <select
            className="UpdatePetForm__select"
            required
            name="size"
            value={updatedPet.size}
            onChange={handleInputChange}
          >
            <option value="">Selecione</option>
            <option value="Pequeno">Pequeno</option>
            <option value="Médio">Médio</option>
            <option value="Grande">Grande</option>
          </select>
        </label>
        <label className="UpdatePetForm__label">
          Raça:
          <input
            placeholder="informe a raça do pet..."
            className="UpdatePetForm__input"
            required
            type="text"
            name="breed"
            value={updatedPet.breed}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <label className="UpdatePetForm__label">
        Possui problemas de saúde?
        <input
          placeholder="Se sim, quais?"
          className="UpdatePetForm__input"
          type="text"
          name="healthProblems"
          value={updatedPet.healthProblems}
          onChange={handleInputChange}
        />
      </label>
      <label className="UpdatePetForm__label">
        Possuí alergias?
        <input
          placeholder="Se sim, quais?"
          className="UpdatePetForm__input"
          type="text"
          name="allergies"
          value={updatedPet.allergies}
          onChange={handleInputChange}
        />
      </label>
      <label className="UpdatePetForm__label">
        Informações adicionais:
        <input
          className="UpdatePetForm__input"
          type="text"
          placeholder="Coloque aqui informações adicionais sobre o pet..."
          name="additionalInfo"
          value={updatedPet.additionalInfo}
          onChange={handleInputChange}
        />
      </label>
      <div className="UpdatePetForm__actions">
        <Button text="Cancelar" onClick={onClose} />
        <Button type="submit" text="Atualizar" />
      </div>
    </form>
  )
}

export default UpdatePetForm
