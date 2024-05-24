import IAddress from "./IAddress"

export default interface IEmployee {
  _id?: string
  name: string
  cpf: string
  birthdate: Date
  phone_number: string
  address: IAddress
  position: string
  email?: string
  hire_date: Date
  additional_info?: string
}
