export const formatDate = (date: string | Date): string => {
  const parsedDate = new Date(date)

  // Verifica se a data é válida
  if (isNaN(parsedDate.getTime())) {
    return 'Invalid date'
  }

  return new Intl.DateTimeFormat('en-US').format(parsedDate)
}
