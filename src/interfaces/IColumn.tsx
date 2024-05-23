import IAddress from './IAddress'

export default interface IColumn<T> {
  id: keyof T
  label: string
  minWidth?: number
  align?: 'right' | 'center'
  format?: (value: IAddress) => string
}
