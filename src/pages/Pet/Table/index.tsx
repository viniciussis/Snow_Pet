import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@material-ui/core'
import pets from "@/data/pets.json"
import * as React from 'react'

interface Column {
  id:
    | 'name'
    | 'owner'
    | 'specie'
    | 'breed'
    | 'size'
    | 'gender'
    | 'healthProblems'
    | 'allergies'
    | 'additionalInfo'
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: string) => string
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Nome', minWidth: 100 },
  { id: 'owner', label: 'Dono', minWidth: 150 },
  { id: 'specie', label: 'Espécie', minWidth: 50 },
  { id: 'breed', label: 'Raça', minWidth: 100 },
  { id: 'size', label: 'Porte', minWidth: 50 },
  { id: 'gender', label: 'Sexo', minWidth: 50 },
  { id: 'healthProblems', label: 'Problemas de Saúde', minWidth: 175 },
  { id: 'allergies', label: 'Alergias', minWidth: 100 },
  { id: 'additionalInfo', label: 'Informações Adicionais', minWidth: 200 },
]
 
const PetTable = () => {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

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
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {pets
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((pet) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={pet.id}>
                    {columns.map((column) => {
                      const value = pet[column.id]
                      return (
                        <TableCell key={column.id} align={column.align}>
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
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={pets.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default PetTable
