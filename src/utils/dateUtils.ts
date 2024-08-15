export const formatDate = (date: string) => {
  const dateFormatted = date.slice(0, -8).split('T')
  return `${dateFormatted[0]} ${dateFormatted[1]}`
}

export const formatDateToInputField = (date: string) => {
  return date.substring(0, 16)
}

export const formatDateToDatabase = (date: string) => {
  return date + ':00.000Z'
}
