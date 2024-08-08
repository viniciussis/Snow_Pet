import { useNavigate, useParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'

import useCustomers from '@/hooks/useCustomers'
import Button from '@/components/Button'
import Modal from '@/components/Modal'
import usePets from '@/hooks/usePets'
import IPet from '@/interfaces/IPet'
import api from '@/api'
import './PetForm.scss'
import { PetSpecie } from '@/shared/enums/PetSpecie'
import { PetSize } from '@/shared/enums/PetSize'
import { PetGender } from '@/shared/enums/PetGender'

const PetForm = () => {
  const params = useParams()
  const navigate = useNavigate()
  const { getPetById } = usePets()
  const { customers: ownerList } = useCustomers()
  const [newPet, setNewPet] = useState<IPet>({
    name: '',
    specie: PetSpecie.CACHORRO,
    ownerId: '',
    breed: '',
    size: PetSize.GRANDE,
    gender: PetGender.FEMEA,
    healthProblems: '',
    allergies: '',
    additionalInfo: '',
  })

  useEffect(() => {
    if (params.id) {
      const pet = getPetById(params.id)
      if (pet !== undefined) {
        setNewPet({ ...pet })
      }
    }
  }, [getPetById, params])

  const addPet = useMutation({
    mutationFn: () => {
      console.log({ ...newPet })
      return api.post<IPet>('pets/', newPet)
    },
    onSuccess: () => {
      navigate('/pet')
    },
    onError: (err) => {
      console.log(err.message)
    },
  })

  const updatePet = useMutation({
    mutationFn: () => {
      const { id, createdAt, updatedAt, ...updatedPet } = newPet
      console.log({ ...updatedPet })
      return api.patch<IPet>(`pets/${params.id}`, { ...updatedPet })
    },
    onSuccess: () => {
      navigate('/pet')
    },
    onError: (err) => {
      console.log(err.message)
    },
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
    if (params.id) {
      updatePet.mutate()
    } else {
      addPet.mutate()
    }
  }

  return (
    <>
      <div className="petFormContainer" />
      <Modal title="Formulário de Pet">
        <form className="petForm" onSubmit={handleSubmit}>
          <div className="petForm__rows">
            <label className="petForm__label">
              Nome do Pet*:
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
              Dono*:
              <select
                className="petForm__select"
                required
                name="ownerId"
                value={newPet.ownerId}
                onChange={handleInputChange}
              >
                <option value="">Selecione o dono do pet...</option>
                {ownerList.map((owner) => (
                  <option key={owner.id} value={owner.id}>
                    {owner.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="petForm__label">
              Sexo*:
              <select
                className="petForm__select"
                required
                name="gender"
                value={newPet.gender}
                onChange={handleInputChange}
              >
                <option value="">Selecione</option>
                <option value="MACHO">Macho</option>
                <option value="FEMEA">Fêmea</option>
              </select>
            </label>
          </div>
          <div className="petForm__rows">
            <label className="petForm__label">
              Animal*:
              <select
                className="petForm__select"
                required
                name="specie"
                value={newPet.specie}
                onChange={handleInputChange}
              >
                <option value="">Selecione</option>
                <option value="CACHORRO">Cachorro</option>
                <option value="GATO">Gato</option>
                <option value="PASSARO">Pássaro</option>
              </select>
            </label>
            <label className="petForm__label">
              Porte*:
              <select
                className="petForm__select"
                required
                name="size"
                value={newPet.size}
                onChange={handleInputChange}
              >
                <option value="">Selecione</option>
                <option value="PEQUENO">Pequeno</option>
                <option value="MEDIO">Médio</option>
                <option value="GRANDE">Grande</option>
              </select>
            </label>
            <label className="petForm__label">
              Raça*:
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
              placeholder="Se sim, quais? (opcional)"
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
              placeholder="Se sim, quais? (opcional)"
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
              placeholder="Coloque aqui informações adicionais sobre o pet... (opcional)"
              name="additionalInfo"
              value={newPet.additionalInfo}
              onChange={handleInputChange}
            />
          </label>
          <div className="petForm__actions">
            <Button
              text="Cancelar"
              colorType="fail"
              onClick={() => navigate('/pet')}
            />
            <Button type="submit" text="Cadastrar" colorType="success" />
          </div>
        </form>
      </Modal>
    </>
  )
}

export default PetForm
