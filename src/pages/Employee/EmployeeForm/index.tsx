import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import IEmployee from '@/interfaces/IEmployee'
import Button from '@/components/Button'
import Modal from '@/components/Modal'
import './EmployeeForm.scss'
import http from '@/http'

const EmployeeForm = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [newEmployee, setNewEmployee] = useState<IEmployee>({
    name: '',
    address: {
      neighborhood: '',
      number: '',
      street: '',
      complement: '',
    },
    phone_number: '',
    email: '',
    cpf: '',
    position: '',
    additional_info: '',
    birthdate: new Date(),
    hire_date: new Date(),
  })

  useEffect(() => {
    if (params.id) {
      http
        .get(`employees/${params.id}`)
        .then((resp) => setNewEmployee(resp.data))
        .catch((err) => console.error(err.message))
    }
  }, [params])

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1]
      setNewEmployee((prevEmployee) => ({
        ...prevEmployee,
        address: {
          ...prevEmployee.address,
          [addressField]: value,
        },
      }))
    } else if (
      name === 'complement' ||
      name === 'neighborhood' ||
      name === 'number' ||
      name === 'street'
    ) {
      setNewEmployee((prevEmployee) => ({
        ...prevEmployee,
        address: {
          ...prevEmployee.address,
          [name]: value,
        },
      }))
    } else if (name === 'birthdate' || name === 'hire_date') {
      setNewEmployee({
        ...newEmployee,
        [name]: new Date(value),
      })
    } else {
      setNewEmployee({
        ...newEmployee,
        [name]: value,
      })
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (params.id) {
      http
        .put(`employees/${params.id}`, {
          ...newEmployee,
        })
        .then((resp) => {
          navigate('/cliente')
          console.log(resp.data.message)
        })
        .catch((err) => {
          console.log(err.message)
        })
    } else {
      http
        .post('employees/', {
          ...newEmployee,
        })
        .then((resp) => {
          console.log(resp)
          navigate('/funcionario')
        })
        .catch((err) => console.log(err.message))
    }
  }

  return (
    <>
      <div className="employeeFormContainer" />
      <Modal title="Formulário de Clientes">
        <form className="employeeForm" onSubmit={handleSubmit}>
          <div className="employeeForm__rows">
            <label className="employeeForm__label">
              Nome do Cliente*:
              <input
                placeholder="Informe o nome do cliente..."
                className="employeeForm__input"
                required
                type="text"
                name="name"
                value={newEmployee.name}
                onChange={handleInputChange}
              />
            </label>
            <label className="employeeForm__label">
              Email:
              <input
                placeholder="Informe o email... (opcional)"
                className="employeeForm__input"
                type="text"
                name="email"
                value={newEmployee.email}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="employeeForm__rows">
            <label className="employeeForm__label">
              Rua*:
              <input
                placeholder="Informe o nome da rua..."
                className="employeeForm__input"
                required
                type="text"
                name="address.street"
                value={newEmployee.address.street}
                onChange={handleInputChange}
              />
            </label>
            <label className="employeeForm__label">
              Número*:
              <input
                placeholder="Informe o número da casa..."
                className="employeeForm__input"
                required
                type="text"
                name="address.number"
                value={newEmployee.address.number}
                onChange={handleInputChange}
              />
            </label>
            <label className="employeeForm__label">
              Complemento:
              <input
                placeholder="Informações adicionais (opcional)..."
                className="employeeForm__input"
                type="text"
                name="address.complement"
                value={newEmployee.address.complement}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="employeeForm__rows">
            <label className="employeeForm__label">
              Bairro*:
              <input
                placeholder="informe o bairro..."
                className="employeeForm__input"
                required
                type="text"
                name="address.neighborhood"
                value={newEmployee.address.neighborhood}
                onChange={handleInputChange}
              />
            </label>
            <label className="employeeForm__label">
              Telefone*:
              <input
                placeholder="Informe o telefone..."
                className="employeeForm__input"
                required
                type="text"
                name="phone_number"
                value={newEmployee.phone_number}
                onChange={handleInputChange}
              />
            </label>
            <label className="employeeForm__label">
              CPF*:
              <input
                className="employeeForm__input"
                required
                type="text"
                placeholder="Informe o CPF..."
                name="social_media"
                value={newEmployee.cpf}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="employeeForm__rows">
            <label className="employeeForm__label">
              Cargo*:
              <input
                placeholder="informe o cargo..."
                className="employeeForm__input"
                required
                type="text"
                name="position"
                value={newEmployee.position}
                onChange={handleInputChange}
              />
            </label>
            <label className="employeeForm__label">
              Data de Nascimento*:
              <input
                className="employeeForm__input"
                required
                type="date"
                name="birthdate"
                value={newEmployee.birthdate.toISOString().substring(0, 10)}
                onChange={handleInputChange}
              />
            </label>
            <label className="employeeForm__label">
              Data de Contratação*:
              <input
                className="employeeForm__input"
                required
                type="date"
                name="hire_date"
                value={newEmployee.hire_date.toISOString().substring(0, 10)}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="employeeForm__rows">
            <label className="employeeForm__label">
              Informações adicionais:
              <input
                className="employeeForm__input"
                type="text"
                placeholder="Coloque aqui informações adicionais sobre o funcionário... (opcional)"
                name="additional_info"
                value={newEmployee.additional_info}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="employeeForm__actions">
            <Button
              text="Cancelar"
              colorType="fail"
              onClick={() => navigate('/cliente')}
            />
            <Button type="submit" text="Cadastrar" colorType="success" />
          </div>
        </form>
      </Modal>
    </>
  )
}

export default EmployeeForm
