import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@material-ui/core'
import React, { useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { FaPencil } from 'react-icons/fa6'

import IPet from '@/interfaces/IPet'
import './FlexTable.scss'

const columns: readonly Column[] = [
  { id: 'name', label: 'Nome', minWidth: 100 },
  { id: 'owner', label: 'Dono', minWidth: 150 },
  { id: 'specie', label: 'Espécie', align: 'center', minWidth: 50 },
  { id: 'breed', label: 'Raça', align: 'center', minWidth: 100 },
  { id: 'size', label: 'Porte', align: 'center', minWidth: 50 },
  { id: 'gender', label: 'Sexo', align: 'center', minWidth: 50 },
  { id: 'healthProblems', label: 'Problemas de Saúde', minWidth: 125 },
  { id: 'allergies', label: 'Alergias', minWidth: 100 },
  { id: 'additionalInfo', label: 'Informações Adicionais', minWidth: 175 },
]

interface TableFlexProps {
  items: IPet[]
  remove: (id: number) => void
  update: (id: number) => void
}

const FlexTable: React.FC<TableFlexProps> = ({ items, remove, update }) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper className="tableContainer" sx={{ borderRadius: '1rem' }}>
      <TableContainer sx={{ maxHeight: 516 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell />
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontFamily: 'Poppins' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {items
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={item.id}>
                    <TableCell>
                      <div style={{ display: 'flex' }}>
                        <IconButton
                          onClick={() => remove(item.id)}
                          color="error"
                          aria-label="deletar"
                        >
                          <FaTrash size={20} />
                        </IconButton>
                        <IconButton
                          onClick={() => update(item.id)}
                          color="warning"
                          aria-label="editar"
                        >
                          <FaPencil size={20} />
                        </IconButton>
                      </div>
                    </TableCell>
                    {columns.map((column) => {
                      const value = item[column.id]
                      return (
                        <TableCell
                          key={column.id}
                          style={{
                            fontFamily: 'Montserrat',
                            fontWeight: '500',
                          }}
                          align={column.align}
                        >
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        count={items.length}
        labelRowsPerPage="Linhas por página:"
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default FlexTable
