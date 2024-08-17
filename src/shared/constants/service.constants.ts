import { IColumn, IService, ICustomer } from '../interfaces'
import { formatBrl, formatDate } from '@/utils'

export const SERVICE_COLUMNS: IColumn<IService & ICustomer>[] = [
  { id: 'name', label: 'Cliente', align: 'center', minWidth: 100 },
  {
    id: 'totalValue',
    label: 'Valor Total',
    align: 'center',
    minWidth: 50,
    formatBrl,
  },
  { id: 'date', label: 'Data', minWidth: 75, align: 'center', formatDate },
]
