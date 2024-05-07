import moment from 'moment';

export function stringToDate(dateValue: string): Date {
    if (dateValue.length <= 0) {
        return new Date()
    }
    return moment(dateValue, 'YYYY-MM-DD').toDate();
}

export function displayDate(dateValue: string): string {
    if (dateValue.length <= 0) {
        return ""
    }
    return moment(dateValue, 'YYYY-MM-DD').format("L");
}

export function dateToString(date: Date): string {
    return moment(date).format('YYYY-MM-DD')
}
