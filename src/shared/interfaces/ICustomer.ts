import { IAddress } from '.'

export interface ICustomer {
  id?: string
  name: string
  address: IAddress
  email?: string
  phoneNumber: string
  socialMedia?: string
}
