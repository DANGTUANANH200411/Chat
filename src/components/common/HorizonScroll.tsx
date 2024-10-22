import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Row } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { newGuid } from '../../utils/helper';

interface Props {
	amount?: number;
	children: React.ReactNode;
}
function HorizonScroll(props: Props) {
	const { amount, children } = props;
	const [scrollable, setScrollable] = useState<boolean>(false);
	const [disableLeft, setDisableLeft] = useState<boolean>(false);
	const [disableRight, setDisableRight] = useState<boolean>(false);

    const id = useMemo(()=> newGuid(), []);

	useEffect(() => {
		const node = document.getElementById(id) as HTMLElement;
		if (!node) return;
		const { scrollWidth, clientWidth } = node;
		setScrollable(scrollWidth > clientWidth);
	}, [id]);

	const onScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
		const { scrollWidth, scrollLeft, clientWidth } = e.target as HTMLElement;
		setDisableLeft(scrollLeft === 0);
		setDisableRight(scrollWidth - scrollLeft === clientWidth);
	};
	return (
		<Row wrap={false}>
			{scrollable && (
				<LeftOutlined
					className={`hoverable-icon ${disableLeft && 'disabled'}`}
					style={{ fontSize: 'x-small' }}
					onClick={() => {
						document.getElementById(id)!.scrollLeft -= amount ?? 100;
					}}
				/>
			)}

			<Row id={id} wrap={false} style={{ overflow: 'hidden' }} onScroll={onScroll}>
				{children}
			</Row>

			{scrollable && (
				<RightOutlined
					className={`hoverable-icon ${disableRight && 'disabled'}`}
					style={{ fontSize: 'x-small' }}
					onClick={() => {
						document.getElementById(id)!.scrollLeft += amount ?? 100;
					}}
				/>
			)}
		</Row>
	);
}

export default React.memo(HorizonScroll);
