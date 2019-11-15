import moment, { Moment } from 'moment';

export function makeJSDateObject(date: Date | Moment) {
    if (moment.isMoment(date)) {
        return (date as Moment).clone().toDate();
    }

    if (date instanceof Date) {
        return new Date(date.getTime());
    }

    throw new Error('Cannot properly parse argument passed to cloneCrossUtils');
}