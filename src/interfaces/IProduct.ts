import ICategory from './ICategory'

export default interface IProduct {
  id?: string
  name: string
  brand: string
  price: number
  measure: string
  categoryId?: string
  category?: ICategory
  description?: string
}
