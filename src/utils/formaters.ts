import ICategory from '@/interfaces/ICategory'
import IAddress from '@/interfaces/IAddress'

export const formatDate = (date: string) => {
  const dateFormatted = date.slice(0, -8).split('T')
  return `${dateFormatted[0]} ${dateFormatted[1]}`
}

export const formatCategory = (category: ICategory) => {
  return `${category.label}`
}

export const formatBrl = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export const formatBoolean = (value: boolean) => {
  if (value === true) return 'Sim'
  else return 'Não'
}

export const formatAddress = (address: IAddress) => {
  const complement = address.complement ? ', ' + address.complement : ''
  return `${address.street}, ${address.houseNumber}${complement} - ${address.neighborhood}`
}
