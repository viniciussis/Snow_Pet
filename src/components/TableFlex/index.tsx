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
import { FaPencil } from 'react-icons/fa6'
import { FaTrash } from 'react-icons/fa'
import { useState } from 'react'

import {
  formatAddress,
  formatBoolean,
  formatBrl,
  formatCategory,
  formatDate,
} from '@/utils'
import { IColumn } from '@/shared/interfaces'
import './TableFlex.scss'

interface TableFlexProps<T> {
  data: T[]
  columns: IColumn<T>[]
  remove: (id: string) => void
  update: (id: string) => void
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TableFlex: React.FC<TableFlexProps<any>> = ({
  data,
  columns,
  remove,
  update,
}) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper className="tableContainer" sx={{ borderRadius: '0.5rem' }}>
      <TableContainer sx={{ maxHeight: 516 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell />
              {columns.map((column, index) => (
                <TableCell
                  key={index}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    fontFamily: 'Open Sans',
                    fontSize: '1.05rem',
                    fontWeight: '600',
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
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
                    {columns.map((column, index) => {
                      let value = item[column.id]
                      if (column.formatAddress) {
                        value = formatAddress(value)
                      } else if (column.formatBoolean) {
                        value = formatBoolean(value)
                      } else if (column.formatCategory) {
                        value = formatCategory(value)
                      } else if (column.formatDate) {
                        value = formatDate(value)
                      } else if (column.formatBrl) {
                        value = formatBrl(value)
                      }
                      return (
                        <TableCell
                          key={index}
                          style={{
                            textTransform: 'capitalize',
                            fontFamily: 'Open Sans',
                            fontSize: '0.90rem',
                          }}
                          align={column.align}
                        >
                          {value}
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
        onPageChange={() => handleChangePage}
        count={data.length}
        labelRowsPerPage="Linhas por página:"
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default TableFlex
