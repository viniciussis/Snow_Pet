import IAddress from '@/interfaces/IAddress'

const formatAddress = (address: IAddress) => {
  const complement = address.complement ? ', ' + address.complement : ''
  return `${address.street}, ${address.houseNumber}${complement} - ${address.neighborhood}`
}

export default formatAddress
