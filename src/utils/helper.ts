import { COUNTRIES } from './countries';
import WORD from '../resources/file/word.svg';
import EXCEL from '../resources/file/excel.svg';
import PDF from '../resources/file/pdf.png';
import PPTX from '../resources/file/pptx.png';
import ZIP from '../resources/file/zip.png';
import TXT from '../resources/file/txt.png';
import UNKNOWN from '../resources/file/unknown.png';
import { User } from './type';
const toString = Object.prototype.toString;

export function is(val: unknown, type: string) {
	return toString.call(val) === `[object ${type}]`;
}

export function isDef<T = unknown>(val?: T): val is T {
	return typeof val !== 'undefined';
}

export function isUnDef<T = unknown>(val?: T): val is T {
	return !isDef(val);
}

export function isObject(val: any): val is Record<any, any> {
	return val !== null && is(val, 'Object');
}

export function isEmpty<T = unknown>(val: T): val is T {
	if (isArray(val) || isString(val)) {
		return val.length === 0;
	}

	if (val instanceof Map || val instanceof Set) {
		return val.size === 0;
	}

	if (isObject(val)) {
		return Object.keys(val).length === 0;
	}

	return false;
}

export function isDate(val: unknown): val is Date {
	return is(val, 'Date');
}

export function isNull(val: unknown): val is null {
	return val === null;
}

export function isNullAndUnDef(val: unknown): val is null | undefined {
	return isUnDef(val) && isNull(val);
}

export function isNullOrUnDef(val: unknown): val is null | undefined {
	return isUnDef(val) || isNull(val);
}

export function isNumber(val: unknown): val is number {
	return is(val, 'Number');
}

export function isPromise<T = any>(val: unknown): val is Promise<T> {
	return is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch);
}

export function isString(val: unknown): val is string {
	return is(val, 'String');
}

export function isFunction(val: unknown): val is Function {
	return typeof val === 'function';
}

export function isBoolean(val: unknown): val is boolean {
	return is(val, 'Boolean');
}

export function isRegExp(val: unknown): val is RegExp {
	return is(val, 'RegExp');
}

export function isArray(val: any): val is Array<any> {
	return val && Array.isArray(val);
}

export function isWindow(val: any): val is Window {
	return typeof window !== 'undefined' && is(val, 'Window');
}

export function isElement(val: unknown): val is Element {
	return isObject(val) && !!val.tagName;
}

export function isMap(val: unknown): val is Map<any, any> {
	return is(val, 'Map');
}

export const isServer = typeof window === 'undefined';

export const isClient = !isServer;

export const urlRegx =
	/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;

export function isUrl(path: string): boolean {
	const reg =
		/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/i;
	return reg.test(path);
}

export function isImage(path: string): boolean {
	const reg = /[\/.](gif|jpg|jpeg|tiff|png)$/i;
	return reg.test(path);
}
export function isZip(path: string): boolean {
	const reg = /[\/.](zip|rar|7z|tar)$/i;
	return reg.test(path);
}
export function isVideo(path: string): boolean {
	const reg = /[\/.](mp4|mov|avi|mkv|flv)$/i;
	return reg.test(path);
}
export function isAudio(path: string): boolean {
	const reg = /[\/.](mp3|wav|m4a)$/i;
	return reg.test(path);
}
export function template(str: string, args: Record<string, any> = {}) {
	const reg = /\{\s*(\w+)\s*\}/g;
	return str.replace(reg, (word: string, name: string) => {
		return args[name] || '';
	});
}
export const toNormalize = (str?: string) =>
	str
		?.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLocaleLowerCase() ?? '';

export const newGuid = () => crypto.randomUUID();
export const getMobileCode = (code: string) => COUNTRIES.find((e) => e.code === code)?.phone ?? '';

export const randomInt = (max: number) => Math.floor(Math.random() * max);
export const generatePhoneNumber = () =>
	[
		'(+84)',
		8,
		6,
		...Array(7)
			.fill(0)
			.map((e) => randomInt(10)),
	].join('');

export const defaultText = (str: string, defaultText: string) => {
	return str ? str : defaultText;
};
export const getFileIcon = (ext?: string) => {
	if (!ext) return WORD;
	switch (ext) {
		case 'txt':
			return TXT;
		case 'doc':
		case 'docx':
			return WORD;
		case 'xls':
		case 'xlsx':
			return EXCEL;
		case 'pdf':
			return PDF;
		case 'ppt':
		case 'pptx':
			return PPTX;
		case 'zip':
		case 'rar':
		case '7z':
			return ZIP;
		default:
			return UNKNOWN;
	}
};

export const getEmojiSrc = (unified: string) =>
	`https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/${unified}.png`;

export const uuidRegx = /[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/g;

export const mentionRegex =
	/@\[([\w\s]+)\]\(userId:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\)/g;

export function distictBy(arr: any[], key: (item: any) => unknown) {
	return [...new Map(arr.map((e) => [key(e), e])).values()];
}

export function getExt(str: string) {
	const match = str.match(/\.[0-9a-z]+$/i);
	return match ? match[0].slice(1) : '';
}

export function downloadUrl(url: string, fileName?: string) {
	fetch(url)
		.then((res) => res.blob())
		.then((blob) => {
			const link = document.createElement('a');
			link.href = URL.createObjectURL(blob);
			link.download = fileName ?? url.split('/').at(-1) ?? '';
			link.click();
		})
		.catch((error) => {
			console.log(error);
		});
}

export function groupBy(arr: any[], key: string) {
	return arr.reduce(function (rv, x) {
		(rv[x[key]] = rv[x[key]] || []).push(x);
		return rv;
	}, {});
}

export function matchSearchUser (text: string, user: User) {
	if (!text) return true;
	if (!isNaN(Number(text))) {
		if (text.startsWith('0')) text = text.replace('0', '');
		return user.phoneNumber.includes(text);
	} else {
		return normalizeIncludes(user.userName, text);
	}
};

export function normalizeIncludes (str: string, search: string) {
	return toNormalize(str).includes(toNormalize(search));
}

export function dummyUploadAction ({onSuccess}: any) {
	setTimeout(() => onSuccess && onSuccess('ok'), 0)
}
export function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}