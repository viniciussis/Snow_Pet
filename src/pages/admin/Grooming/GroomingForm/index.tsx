import { useNavigate, useParams } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import { Grooming, groomingSchema } from '@/shared/schemas'
import { useGroomings, usePets } from '@/hooks/stores'
import { GROOMING_TYPES } from '@/shared/constants'
import Button from '@/components/Button'
import Select from '@/components/Select'
import Field from '@/components/Field'
import Modal from '@/components/Modal'
import './GroomingForm.scss'
import api from '@/api'

const GroomingForm = () => {
  const { getGroomingById } = useGroomings()
  const navigate = useNavigate()
  const params = useParams()
  const { pets } = usePets()

  const grooming = params.id ? getGroomingById(params.id) : undefined
  const petsList = pets.map((pet) => ({
    value: pet.id as string,
    label: pet.name,
  }))
  const {
    register,
    handleSubmit,
    formState: { isDirty, isSubmitting, isValid, errors },
  } = useForm<Grooming>({
    defaultValues: grooming ?? {
      date: new Date(),
      petId: '',
      price: 0,
      type: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(groomingSchema),
  })

  const addGrooming = useMutation({
    mutationFn: (data: Grooming) => {
      return api.post<Grooming>('groomings/', data)
    },
    onSuccess: () => {
      navigate('/banho_e_tosa')
    },
    onError: (err) => {
      console.log(err.message)
    },
  })

  const updateGrooming = useMutation({
    mutationFn: (data: Grooming) => {
      return api.patch<Grooming>(`groomings/${params.id}`, data)
    },
    onSuccess: () => {
      navigate('/banho_e_tosa')
    },
    onError: (err) => {
      console.log(err.message)
    },
  })

  const submitting = (data: Grooming) => {
    if (params.id) {
      updateGrooming.mutate(data)
    } else {
      addGrooming.mutate(data)
    }
  }

  return (
    <>
      <div className="groomingFormContainer" />
      <Modal title="Formulário de Banhos e Tosas">
        <form className="groomingForm" onSubmit={handleSubmit(submitting)}>
          <div className="groomingForm__rows">
            <Select
              {...register('type')}
              label="Tipo de Serviço*"
              options={GROOMING_TYPES.TYPES}
              errors={errors.type?.message}
            />
            <Select
              label="Pet*"
              options={petsList}
              {...register('petId')}
              errors={errors.petId?.message}
            />
          </div>
          <div className="groomingForm__rows">
            <Field
              min={0}
              type="number"
              label="Preço*"
              errors={errors.price?.message}
              {...register('price', { valueAsNumber: true })}
            />
            <Field
              label="Data*"
              type="datetime-local"
              errors={errors.date?.message}
              {...register('date', { valueAsDate: true })}
            />
          </div>
          <div className="groomingForm__actions">
            <Button
              text="Cancelar"
              colorType="fail"
              onClick={() => navigate('/banho_e_tosa')}
            />
            <Button
              type="submit"
              text="Cadastrar"
              colorType="success"
              disabled={!isDirty || !isValid || isSubmitting}
            />
          </div>
        </form>
      </Modal>
    </>
  )
}

export default GroomingForm
