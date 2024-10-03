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
export const NOW = (): Dayjs => dayjs(new Date());
export const SYSTEM_NOW = () => dayjs(new Date()).format('YYYYMMDDHHmmss');
export function toSystemDate(date: Date | Dayjs | string): string {
	if (date instanceof Date || typeof date === 'string') {
		return dayjs(date).format('YYYYMMDDHHmmss');
	}
	return date.format('YYYYMMDDHHmmss');
}
export function displayChatDate (date: string) {
	return dayjs(date).format('DD/MM/YYYY');
}
export function displayChatTime (date: string) {
	return dayjs(date).format('HH:mm');
}

export function displayChatTimeFull (date: string, $$: any) {
	let str = date;
	if (str.length > 8) {
		str = date.substring(0, 8);
	}
	const day = dayjs(str);
	if(day.diff(dayjs(), 'day') === 0) {
		return displayChatTime(date);
	}
	if (day.diff(dayjs(), 'day') === -1) {
		return `${$$('yesterday')} ${displayChatTime(date)}`
	}
	return dayjs(date).format('DD-MM-YYYY HH:mm');
}
export function timeFromNow(date: string) {
	return dayjs(date).fromNow(true);
}
export function addHours(date: Date, hour: number) {
	const dateInMs = date.setHours(date.getHours() + hour);
	return new Date(dateInMs);
}

export function addMinutes(date: Date, minutes: number) {
	const dateInMs = date.setMinutes(date.getMinutes() + minutes);
	return new Date(dateInMs);
}
