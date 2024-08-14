import { useNavigate, useParams } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { PET_OPTIONS } from '@/shared/constants/PetOptions'
import { PetSpecie } from '@/shared/enums/PetSpecie'
import { PetGender } from '@/shared/enums/PetGender'
import { PetSize } from '@/shared/enums/PetSize'
import useCustomers from '@/hooks/useCustomers'
import Button from '@/components/Button'
import Select from '@/components/Select'
import Modal from '@/components/Modal'
import Field from '@/components/Field'
import usePets from '@/hooks/usePets'
import IPet from '@/interfaces/IPet'
import api from '@/api'
import './PetForm.scss'
import { DevTool } from '@hookform/devtools'

const schema = z.object({
  name: z.string(),
  specie: z.nativeEnum(PetSpecie).or(z.string().max(0)),
  ownerId: z.string().or(z.string().max(0)),
  breed: z.string(),
  size: z.nativeEnum(PetSize).or(z.string().max(0)),
  gender: z.nativeEnum(PetGender).or(z.string().max(0)),
  healthProblems: z.string().optional(),
  allergies: z.string().optional(),
  additionalInfo: z.string().optional(),
})

type PetData = z.infer<typeof schema>

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
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PetData>({
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
    resolver: zodResolver(schema),
  })

  const addPet = useMutation({
    mutationFn: (data: PetData) => {
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
    mutationFn: (data: PetData) => {
      return api.patch<IPet>(`pets/${params.id}`, data)
    },
    onSuccess: () => {
      navigate('/pet')
    },
    onError: (err) => {
      console.log(err.message)
    },
  })

  const submitting = (data: PetData) => {
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
              options={ownerList}
              {...register('ownerId')}
              errors={errors.ownerId?.message}
            />
            <Select
              label="Sexo*"
              options={PET_OPTIONS.GENDER}
              {...register('gender')}
              errors={errors.gender?.message}
            />
          </div>
          <div className="petForm__rows">
            <Select
              label="Espécie*"
              options={PET_OPTIONS.SPECIE}
              {...register('specie')}
              errors={errors.specie?.message}
            />
            <Select
              label="Porte*"
              options={PET_OPTIONS.SIZE}
              {...register('size')}
              errors={errors.size?.message}
            />
            <Field
              label="Raça*"
              {...register('breed')}
              required={true}
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
            <Button type="submit" text="Cadastrar" colorType="success" />
          </div>
        </form>
      </Modal>
      <DevTool
        control={control}
        styles={{
          button: { transform: 'scale(1.5)' },
        }}
      />
    </>
  )
}

export default PetForm
