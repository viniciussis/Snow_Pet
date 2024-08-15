import { IAddress, ICategory } from '.'

export interface IColumn<T> {
  id: keyof T
  label: string
  minWidth?: number
  align?: 'right' | 'center'
  formatAddress?: (value: IAddress) => string
  formatCategory?: (value: ICategory) => string
  formatBoolean?: (value: boolean) => string
  formatDate?: (value: string) => string
  formatBrl?: (value: number) => string
}
