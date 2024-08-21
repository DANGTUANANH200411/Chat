import { InputProps } from 'antd';
import { useRef, useState } from 'react';

const EmojiConvertor = require('emoji-js');

const emojiConverter = new EmojiConvertor();
export function ChatInput({
	className,
	type,
	value,
	setValue,
	...props
}: InputProps & { setValue: (v: string) => void }) {
	const ref = useRef<HTMLDivElement | null>(null);
	const [focused, setFocused] = useState(false);
	// NOTES
	// - not allow any selection (to simplify the whole model)
	// - insert & delete
	//   - input prop
	//   - text
	// - possible actions
	//   - let new text not be nested in a prop
	//   - input prop in the middle of text
	//   - input prop at start / end of text

	const onPasteHTMLClick = (prop: string) => {
		const div = document.createElement('div');
		const span = document.createElement('span');
		const val = removeProp(prop);
		span.innerHTML = `${val}`;

		const spanClasses = ['bg-gray-800', 'px-2', 'py-2', 'rounded-md', 'border', 'border-2', 'border-gray-200'];
		span.classList.add(...spanClasses);

		div.appendChild(span);
		div.classList.add('dx-prop', 'border', 'border-2', 'border-gray-400');
		span.contentEditable = String(false);

		// pasteHtmlAtCaret(div.outerHTML + `\u200B \u200B`);
		pasteHtmlAtCaret(div.outerHTML);
		// ref.current?.focus();
	};

	const onInsert = (prop: string) => {
		if (!ref.current) return;
		setFocused(true);
		ref.current!.focus();
		onPasteHTMLClick(prop);
	};

	const pasteHtmlAtCaret = (html: string) => {
		let range;
		const parser = new DOMParser();
		// Parse the html string into a document
		const el = parser.parseFromString(html, 'text/html').body.firstChild!;
		if (!window.getSelection) return;
		// IE9 and non-IE
		const sel = window.getSelection();
		if (sel?.getRangeAt && sel?.rangeCount) {
			range = sel?.getRangeAt(0);
			range.deleteContents();

			range.insertNode(el);

			const placeholder = document.createTextNode('\u200B'); // Zero-width space
			// If you're directly after the badge, this ensures you're typing outside of it
			if (el.nextSibling) {
				range.insertNode(placeholder); // Insert before the next sibling if it exists
			} else {
				// Append it as the last child otherwise
				el.parentNode?.appendChild(placeholder);
			}

			// Move the caret to right after the placeholder
			range.setStartAfter(placeholder);
			range.collapse(true);
			sel.removeAllRanges();
			sel.addRange(range);
		}
	};

	const onBackSpacePress = (e: React.KeyboardEvent) => {
		const sel = window.getSelection();
		const anchorNode = sel?.anchorNode;

		if (anchorNode?.nodeType !== anchorNode?.ELEMENT_NODE) return;

		const anchorEl = anchorNode as HTMLElement;
		if (!anchorEl.classList.contains('dx-prop')) return;
		console.log({ anchorEl });
		e.preventDefault();
		anchorEl.remove();
	};

	const removeProp = (prop: string) => {
		return prop.replace(/prop/g, '');
	};

	const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		console.log(window.getSelection());

		const { key } = e;
		switch (key) {
			case 'Backspace':
				onBackSpacePress(e);
				break;
			default:
		}
	};

	const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		if (!e.relatedTarget?.className.includes('dx-prop-button')) {
			setFocused(false);
		}
	};

	const onInput = (e: React.ChangeEvent<HTMLDivElement>) => {
		console.log('INNER', e);
		setValue(e.target.innerText);
	};
	// console.log('value', ref)
	return (
		<div className='space-y-2'>
			<div className='relative'>
				<div
					contentEditable={true}
					ref={ref}
					{...(props as any)}
					onFocus={() => setFocused(true)}
					onBlur={onBlur}
					onKeyDown={onKeyDown}
					onInput={onInput}
					style={{width: '100%', height: '20px'}}

					dangerouslySetInnerHTML={{__html:  value ? emojiConverter.replace_colons(value) : ''}}
				>
                </div>
			</div>
		</div>
	);
}
