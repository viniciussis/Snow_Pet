import IAddress from './IAddress'

export default interface ICustomer {
  id?: string
  name: string
  address: IAddress
  email?: string
  phoneNumber: string
  socialMedia?: string
}
  