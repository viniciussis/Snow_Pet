import IAddress from "./IAddress"

export default interface ICustomer {
  _id?: string
  name: string
  address: IAddress
  email?: string
  phone_number: string
  social_media?: string
}
