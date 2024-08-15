import { ICategory, IAddress } from '@/shared/interfaces'

export const formatCategory = (category: ICategory) => {
  return `${category.label}`
}

export const formatAddress = (address: IAddress) => {
  const complement = address.complement ? ', ' + address.complement : ''
  return `${address.street}, ${address.houseNumber}${complement} - ${address.neighborhood}`
}
