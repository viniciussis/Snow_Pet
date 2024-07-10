const formatDate = (date: string) => {
  const dateFormatted = date.slice(0, -8).split('T')
  return `${dateFormatted[0]} ${dateFormatted[1]}`
}

export default formatDate
