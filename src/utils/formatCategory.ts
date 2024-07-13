import ICategory from '@/interfaces/ICategory'

const formatCategory = (category: ICategory) => {
  return `${category.label}`
}

export default formatCategory
