import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import ICustomer from '@/interfaces/ICustomer'
import Button from '@/components/Button'
import Modal from '@/components/Modal'
import IPet from '@/interfaces/IPet'
import http from '@/http'
import './PetForm.scss'

const PetForm = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [ownerList, setOwnerList] = useState<ICustomer[]>([])
  const [newPet, setNewPet] = useState<IPet>({
    name: '',
    owner_id: '',
    specie: '',
    breed: '',
    size: 'Pequeno',
    gender: 'Macho',
    health_problems: '',
    allergies: '',
    additional_info: '',
  })

  useEffect(() => {
    if (params.id) {
      http
        .get(`pets/${params.id}`)
        .then((resp) => setNewPet(resp.data))
        .catch((err) => console.log(err.message))
    }
  }, [params])

  useEffect(() => {
    http
      .get('customers/')
      .then((resp) => setOwnerList(resp.data))
      .catch((err) => console.log(err.message))
  }, [])

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
      http
        .put(`pets/${params.id}`, {
          ...newPet,
        })
        .then((resp) => {
          navigate('/pet')
          console.log(resp.data.message)
        })
        .catch((err) => {
          console.log(err.message)
        })
    } else {
      http
        .post('pets/', {
          ...newPet,
        })
        .then((resp) => {
          console.log(resp)
          navigate('/pet')
        })
        .catch((err) => console.log(err.message))
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
                name="owner_id"
                value={newPet.owner_id}
                onChange={handleInputChange}
              >
                <option value="">Selecione o dono do pet...</option>
                {ownerList.map((owner) => (
                  <option key={owner._id} value={owner._id}>
                    {owner.name}
                  </option>
                ))}
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
                <option value="Cachorro">Cachorro</option>
                <option value="Gato">Gato</option>
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
                <option value="Pequeno">Pequeno</option>
                <option value="Médio">Médio</option>
                <option value="Grande">Grande</option>
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
              name="health_problems"
              value={newPet.health_problems}
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
              name="additional_info"
              value={newPet.additional_info}
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
