import moment from 'moment'

export function stringToDate(dateValue: string): Date {
  if (dateValue.length <= 0) {
    return new Date()
  }
  return moment(dateValue, 'YYYY-MM-DD').toDate()
}

export function stringToDatetime(dateValue: string): Date {
  if (dateValue.length <= 0) {
    return new Date()
  }
  return moment(dateValue, 'YYYY-MM-DD hh:mm:ss').toDate()
}

export function displayDate(dateValue: string): string {
  if (dateValue.length <= 0) {
    return ''
  }
  return moment(dateValue, 'YYYY-MM-DD').format('L')
}

export function displayDatetime(dateValue: string): string {
  if (dateValue.length <= 0) {
    return ''
  }
  return moment(dateValue, 'YYYY-MM-DD hh:mm:ss').format('LL hh:mm')
}

export function dateToString(date: Readonly<Date>): string {
  return moment(date).format('YYYY-MM-DD')
}

export function datetimeToString(date: Readonly<Date>): string {
  return moment(date).format('YYYY-MM-DD hh:mm:ss')
}
