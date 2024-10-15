import { WarningOutlined } from '@ant-design/icons';
import { Flex, Modal, ModalProps } from 'antd';
import React, { isValidElement, cloneElement, useState } from 'react';

interface Props extends ModalProps {
	children: React.ReactNode;
	body?: React.ReactNode;
	danger?: true;
}
function Confirm(props: Props) {
	const [open, setOpen] = useState<boolean>(false);
	const { danger, body, children, title, onCancel, onOk, ...rest } = props;

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
						{danger && <WarningOutlined style={{background: 'orange', padding: 6, borderRadius: '50%'}}/>}
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
