import { Dayjs } from 'dayjs';

const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');
var updateLocale = require('dayjs/plugin/updateLocale');
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale('en', {
    relativeTime: {
        future: 'in %s',
        past: '%s ago',
        s: 'a few sec',
        m: 'a min',
        mm: '%d mins',
        h: 'an hour',
        hh: '%d hours',
        d: 'a day',
        dd: '%d days',
        M: 'a month',
        MM: '%d months',
        y: 'a year',
        yy: '%d years',
    },
});

export const SYSTEM_NOW = new dayjs().format('YYYYMMDDHHmmss');
export function toSystemDate(date: Date | Dayjs | string) {
    if (date instanceof Date || typeof date === 'string') {
        return dayjs(date).format('YYYYMMDDHHmmss');
    } else return date.format('YYYYMMDDHHmmss');
}

export function timeFromNow(date: string) {
    return dayjs(date).fromNow(true);
}
export function addHours(date: Date, hour: number) {
    const dateInMs = date.setHours(date.getHours() + hour);
    return new Date(dateInMs);
}
