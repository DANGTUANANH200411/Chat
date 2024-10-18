import { ExclamationCircleFilled } from '@ant-design/icons';
import { Flex, Modal, ModalProps } from 'antd';
import React, { cloneElement, isValidElement, useState } from 'react';

const { confirm } = Modal;
interface Props extends ModalProps {
	children: React.ReactNode;
	body?: React.ReactNode;
	danger?: true;
	icon?: React.ReactNode;
}
function Confirm(props: Props) {
	const { danger, body, children, title, icon, onCancel, onOk, ...rest } = props;

	const [open, setOpen] = useState<boolean>(false);
	return (
		<>
			{isValidElement(children) ? (
				cloneElement(children as React.ReactElement<any>, { onClick: () => setOpen(true) })
			) : (
				<div onClick={() => setOpen(true)}>{children}</div>
			)}
			<Modal
				open={open}
				centered
				onCancel={(e) => {
					setOpen(false);
					onCancel && onCancel(e);
				}}
				onOk={(e) => {
					onOk && onOk(e);
					setOpen(false);
				}}
				title={
					<Flex gap={12} align='center'>
						{danger && (icon ?? <ExclamationCircleFilled style={{ color: 'orange' }} />)}
						{title}
					</Flex>
				}
				destroyOnClose
				{...rest}
				okButtonProps={{
					...(danger ? { color: 'danger', variant: 'filled' } : {}),
					...rest.okButtonProps,
				}}
				cancelButtonProps={{
					type: 'text',
				}}
			>
				{body}
			</Modal>
		</>
	);
}

export default React.memo(Confirm);
