import ICategory from './ICategory'

export default interface IProduct {
  id?: string
  name: string
  brand: string
  category: ICategory
  price: number
  measure: string
  description?: string
}
