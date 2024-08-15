import { useNavigate, useParams } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import { usePets, useCustomers } from '@/hooks/stores'
import { Pet, petSchema } from '@/shared/schemas'
import { PET_OPTIONS } from '@/shared/constants'
import { IPet } from '@/shared/interfaces'
import Button from '@/components/Button'
import Select from '@/components/Select'
import Modal from '@/components/Modal'
import Field from '@/components/Field'
import api from '@/api'
import './PetForm.scss'

const PetForm = () => {
  const { getPetById } = usePets()
  const navigate = useNavigate()
  const params = useParams()

  const pet = params.id ? getPetById(params.id) : undefined
  const { customers } = useCustomers()
  const ownerList = customers.map((customer) => ({
    value: customer.id as string,
    label: customer.name,
  }))

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm<Pet>({
    defaultValues: pet ?? {
      name: '',
      specie: '',
      ownerId: '',
      breed: '',
      size: '',
      gender: '',
      healthProblems: '',
      allergies: '',
      additionalInfo: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(petSchema),
  })

  const addPet = useMutation({
    mutationFn: (data: Pet) => {
      return api.post<IPet>('pets/', data)
    },
    onSuccess: () => {
      navigate('/pet')
    },
    onError: (err) => {
      console.log(err.message)
    },
  })

  const updatePet = useMutation({
    mutationFn: (data: Pet) => {
      return api.patch<IPet>(`pets/${params.id}`, data)
    },
    onSuccess: () => {
      navigate('/pet')
    },
    onError: (err) => {
      console.log(err.message)
    },
  })

  const submitting = (data: Pet) => {
    if (params.id) {
      updatePet.mutate(data)
    } else {
      addPet.mutate(data)
    }
  }

  return (
    <>
      <div className="petFormContainer" />
      <Modal title="Formulário de Pets">
        <form
          onSubmit={handleSubmit(submitting)}
          className="petForm"
          noValidate
        >
          <div className="petForm__rows">
            <Field
              label="Nome*"
              required={true}
              {...register('name')}
              errors={errors.name?.message}
            />
            <Select
              label="Dono*"
              required={true}
              options={ownerList}
              {...register('ownerId')}
              errors={errors.ownerId?.message}
            />
            <Select
              label="Sexo*"
              required={true}
              options={PET_OPTIONS.GENDER}
              {...register('gender')}
              errors={errors.gender?.message}
            />
          </div>
          <div className="petForm__rows">
            <Select
              required={true}
              label="Espécie*"
              options={PET_OPTIONS.SPECIE}
              {...register('specie')}
              errors={errors.specie?.message}
            />
            <Select
              label="Porte*"
              required={true}
              options={PET_OPTIONS.SIZE}
              {...register('size')}
              errors={errors.size?.message}
            />
            <Field
              label="Raça*"
              required={true}
              {...register('breed')}
              errors={errors.breed?.message}
            />
          </div>
          <Field
            label="Problemas de saúde?"
            {...register('healthProblems')}
            errors={errors.healthProblems?.message}
          />
          <Field
            label="Alergias?"
            {...register('allergies')}
            errors={errors.allergies?.message}
          />
          <Field
            label="Informação adicional"
            {...register('additionalInfo')}
            errors={errors.additionalInfo?.message}
          />
          <div className="petForm__actions">
            <Button
              text="Cancelar"
              colorType="fail"
              onClick={() => navigate('/pet')}
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

export default PetForm
