export default interface ICustomerColumn {
  id:
  | 'name'
  | 'address'
  | 'phoneNumber'
  | 'email'
  label: string
  minWidth?: number
  align?: 'right' | 'center'
  format?: (value: string) => string
}
