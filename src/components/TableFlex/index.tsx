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

import ICustomerColumn from '@/interfaces/ICustomerColumn'
import ICustomer from '@/interfaces/ICustomer'
import './TableFlex.scss'
import IPetColumn from '@/interfaces/IPetColumn'
import IPet from '@/interfaces/IPet'

interface TableFlexProps {
  columns: ICustomerColumn[] | IPetColumn[]
  items: ICustomer[] | IPet[]
  remove: (id: number) => void
  update: (id: number) => void
}

const TableFlex: React.FC<TableFlexProps> = ({
  items,
  columns,
  remove,
  update,
}) => {
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
                            ? column.format(String(value))
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

export default TableFlex
