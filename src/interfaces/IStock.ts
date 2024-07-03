import IProduct from './IProduct'

export default interface IStock {
  id?: string
  quantity: number
  date: string
  product: IProduct
}
