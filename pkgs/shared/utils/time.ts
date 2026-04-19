export const timeFormatFromISO = (value?: string | null, empty = ''): string => {
  if (!value) return empty

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) return empty

  if (date.getTime() === 0) return empty

  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
    .format(date)
    .replace(/\//g, '-')
}

export const timeFormat = (
  _row: any,
  _column: any,
  value: string | number | Date | null | undefined,
  _index?: number,
  empty: string = ''
): string => {
  if (!value) return empty

  let isoString: string

  if (value instanceof Date) {
    if (isNaN(value.getTime()) || value.getTime() === 0) return empty
    isoString = value.toISOString()
  } else if (typeof value === 'number') {
    const date = new Date(value)
    if (isNaN(date.getTime()) || date.getTime() === 0) return empty
    isoString = date.toISOString()
  } else if (typeof value === 'string') {
    isoString = value
  } else {
    return empty
  }

  return timeFormatFromISO(isoString, empty)
}
