import IPet from '@/interfaces/IPet'
import './PetForm.scss'
import React, { useEffect, useState } from 'react'
import Button from '@/components/Button'
import Modal from '@/components/Modal'
import { useNavigate, useParams } from 'react-router-dom'
import petsList from '@/data/pets.json'

const PetForm = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [pets, setPets] = useState(petsList)
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

  useEffect(() => {
    if (params.id) {
      const pet = pets.find((pet) => pet.id === Number(params.id))
      if (pet) {
        setNewPet(pet)
      }
    }
  }, [params, pets])

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
    if (params.id) {
      const updatedPetsList = petsList.map((pet) => {
        if (pet.id === Number(params.id)) {
          return newPet
        } else {
          return pet
        }
      })
      setPets(updatedPetsList)
    } else {
      newPet.id = petsList[petsList.length - 1].id + 1
      setPets([...petsList, newPet])
    }
  }

  return (
    <>
      <div className='petFormContainer'/>
      <Modal title="Formulário de Pet">
        <form className="petForm" onSubmit={handleSubmit}>
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
            <Button
              text="Cancelar"
              colorType="fail"
              onClick={() => navigate('/pets')}
            />
            <Button
              type="submit"
              text="Cadastrar"
              colorType="success"
              onClick={() => navigate('/pets')}
            />
          </div>
        </form>
      </Modal>
    </>
  )
}

export default PetForm
