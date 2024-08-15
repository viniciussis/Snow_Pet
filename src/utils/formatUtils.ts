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
