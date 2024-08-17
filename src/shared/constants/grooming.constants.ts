import { formatBrl, formatBoolean, formatDate } from '@/utils'
import { IColumn, IGrooming, IPet } from '../interfaces'

export const GROOMING_COLUMNS: IColumn<IGrooming & IPet>[] = [
  { id: 'name', label: 'Nome do Pet', align: 'center', minWidth: 50 },
  { id: 'type', label: 'Tipo', align: 'center', minWidth: 75 },
  { id: 'price', label: 'Preço', minWidth: 50, align: 'center', formatBrl },
  {
    id: 'combo',
    label: 'É Pacote?',
    align: 'center',
    minWidth: 50,
    formatBoolean,
  },
  { id: 'date', label: 'Data', align: 'center', minWidth: 75, formatDate },
]

interface Option {
  value: string
  label: string
}

interface GroomingTypes {
  TYPES: Option[]
}

export const GROOMING_TYPES = {
  TYPES: [
    { label: 'Banho', value: 'banho' },
    { label: 'Tosa', value: 'tosa' },
    { label: 'Banho e Tosa', value: 'banho_e_tosa' },
  ],
} as GroomingTypes
