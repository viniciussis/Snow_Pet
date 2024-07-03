import IAddress from './IAddress'
import ICategory from './ICategory'

export default interface IColumn<T> {
  id: keyof T
  label: string
  minWidth?: number
  align?: 'right' | 'center'
  formatAddress?: (value: IAddress) => string
  formatCategory?: (value: ICategory) => string
}
