export const capitalizeString = (str: string) => {
  if (!str) return ''

  return `${str[0].toUpperCase()}${str.slice(1)}`
}

export const getMarkColor = (mark: number) => {
  if (mark >= 8) return `green`
  if (mark <= 4) return `green`

  return `red`
}
