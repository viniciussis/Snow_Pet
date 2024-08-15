import { useNavigate, useParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'

import { formatDateToInputField, formatDateToDatabase } from '@/utils'
import { useGroomings, usePets } from '@/hooks/stores'
import { IGrooming } from '@/shared/interfaces'
import Button from '@/components/Button'
import Modal from '@/components/Modal'
import './GroomingForm.scss'
import api from '@/api'

const GroomingForm = () => {
  const params = useParams()
  const navigate = useNavigate()
  const { getGroomingById } = useGroomings()
  const { pets: petList } = usePets()
  const [newGrooming, setNewGrooming] = useState<IGrooming>({
    type: '',
    petId: '',
    price: 0,
    date: '',
  })

  useEffect(() => {
    if (params.id) {
      const grooming = getGroomingById(params.id)
      if (grooming !== undefined) {
        setNewGrooming({
          ...grooming,
          date: formatDateToInputField(grooming.date),
        })
        console.log(grooming)
      }
    }
  }, [getGroomingById, params])

  const addGrooming = useMutation({
    mutationFn: () => {
      return api.post<IGrooming>('groomings/', {
        ...newGrooming,
        date: formatDateToDatabase(newGrooming.date),
      })
    },
    onSuccess: () => {
      navigate('/banho_e_tosa')
    },
    onError: (err) => {
      console.log(err.message)
    },
  })

  const updateGrooming = useMutation({
    mutationFn: () => {
      const { createdAt, id, updatedAt, ...updatedGrooming } = newGrooming
      return api.patch<IGrooming>(`groomings/${params.id}`, {
        ...updatedGrooming,
        date: formatDateToDatabase(newGrooming.date),
      })
    },
    onSuccess: () => {
      navigate('/banho_e_tosa')
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
    let parsedValue: string | number = value
    if (name === 'price') {
      parsedValue = parseFloat(value)
    }
    setNewGrooming({
      ...newGrooming,
      [name]: parsedValue,
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (params.id) {
      updateGrooming.mutate()
    } else {
      addGrooming.mutate()
    }
  }

  return (
    <>
      <div className="groomingFormContainer" />
      <Modal title="Formulário de Banhos e Tosas">
        <form className="groomingForm" onSubmit={handleSubmit}>
          <div className="groomingForm__rows">
            <label className="groomingForm__label">
              Tipo de Banho*:
              <select
                className="groomingForm__select"
                required
                name="type"
                value={newGrooming.type}
                onChange={handleInputChange}
              >
                <option value="">Selecione o tipo de banho...</option>
                <option value="banho">Banho</option>
                <option value="tosa">Tosa</option>
                <option value="banho_e_tosa">Banho e Tosa</option>
              </select>
            </label>
            <label className="groomingForm__label">
              Pet*:
              <select
                className="groomingForm__select"
                required
                name="petId"
                value={newGrooming.petId}
                onChange={handleInputChange}
              >
                <option value="">Selecione o pet...</option>
                {petList.map((pet) => (
                  <option key={pet.id} value={pet.id}>
                    {pet.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="groomingForm__rows">
            <label className="groomingForm__label">
              Preço*:
              <input
                placeholder="informe o valor do Serviço..."
                className="groomingForm__input"
                required
                type="number"
                min={0}
                name="price"
                value={newGrooming.price}
                onChange={handleInputChange}
              />
            </label>
            <label className="groomingForm__label">
              Data*:
              <input
                placeholder="informe a data do Serviço..."
                className="groomingForm__input"
                required
                type="datetime-local"
                name="date"
                value={newGrooming.date}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="groomingForm__actions">
            <Button
              text="Cancelar"
              colorType="fail"
              onClick={() => navigate('/banho_e_tosa')}
            />
            <Button type="submit" text="Cadastrar" colorType="success" />
          </div>
        </form>
      </Modal>
    </>
  )
}

export default GroomingForm
