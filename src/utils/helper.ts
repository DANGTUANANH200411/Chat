import { COUNTRIES } from './countries';
import WORD from '../resources/file/word.svg';
import EXCEL from '../resources/file/excel.svg';
import PDF from '../resources/file/pdf.png';
import PPTX from '../resources/file/pptx.png';
import ZIP from '../resources/file/zip.png';
import TXT from '../resources/file/txt.png';
import UNKNOWN from '../resources/file/unknown.png';
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

export function isUrl(path: string): boolean {
	const reg =
		/(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
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
export const toNormalize = (str: string) =>
	str
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLocaleLowerCase();

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
