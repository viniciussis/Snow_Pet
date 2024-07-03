import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import formatAddress from '@/utils/formatAddress'
import TableFlex from '@/components/TableFlex'
import SearchBar from '@/components/SearchBar'
import IEmployee from '@/interfaces/IEmployee'
import IColumn from '@/interfaces/IColumn'
import Button from '@/components/Button'
import api from '@/api'
import './Employee.scss'

const employeeColumns: IColumn<IEmployee>[] = [
  { id: 'name', label: 'Nome', minWidth: 100 },
  { id: 'cpf', label: 'Cpf', minWidth: 50, align: 'center' },
  {
    id: 'birthdate',
    label: 'Data de nascimento',
    minWidth: 50,
    align: 'center',
  },
  { id: 'phone_number', label: 'Telefone', minWidth: 50, align: 'center' },
  { id: 'address', label: 'Endereço', minWidth: 100, format: formatAddress },
  { id: 'email', label: 'Email', minWidth: 100 },
  { id: 'position', label: 'Cargo', minWidth: 50 },
  { id: 'hire_date', label: 'Data de contratação', minWidth: 50 },
  { id: 'additional_info', label: 'Informação adicional', minWidth: 100 },
]

const Employee = () => {
  const [employees, setEmployees] = useState<IEmployee[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    api.get<IEmployee[]>('customers/').then((response) => {
      setEmployees(response.data)
    })
  }, [])

  const updateEmployee = (id: string) => {
    navigate(`/funcionario/${id}`)
  }

  const removeEmployee = (id: string) => {
    api
      .delete(`employees/${id}`)
      .then((resp) => {
        console.log(resp.data.message)
        setEmployees(employees.filter((employee) => employee.id !== id))
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  return (
    <div className="employee">
      <h1 className="employee__title">Gerenciamento de Funcionários</h1>
      <div className="employee__actions">
        <SearchBar placeholder="Pesquisar Funcionários..." />
        <Button
          text="Novo Funcionário"
          onClick={() => navigate('/funcionario/novo')}
        />
      </div>
      <TableFlex
        remove={removeEmployee}
        update={updateEmployee}
        columns={employeeColumns}
        data={employees}
      />
      <div>
        <Button
          text="Relatórios"
          onClick={() => navigate('/relatorios/funcionario')}
        />
      </div>
    </div>
  )
}

export default Employee
