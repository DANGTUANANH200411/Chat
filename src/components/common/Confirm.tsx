import { ExclamationCircleFilled, WarningOutlined } from '@ant-design/icons';
import { Flex, Modal, ModalProps } from 'antd';
import React, { isValidElement, cloneElement, useState } from 'react';

const { confirm } = Modal;
interface Props extends ModalProps {
	children: React.ReactNode;
	body?: React.ReactNode;
	danger?: true;
}
function Confirm(props: Props) {
	const { danger, body, children, title, onCancel, onOk, ...rest } = props;

	const showDeleteConfirm = () => {
		confirm({
			title,
			centered: true,
			icon: <ExclamationCircleFilled />,
			content: body,
			okType: 'danger',
			maskClosable: true,
			onOk,
			onCancel,
			...rest,
		});
	};
	return (
		<>
			{isValidElement(children) ? (
				cloneElement(children as React.ReactElement<any>, { onClick: showDeleteConfirm })
			) : (
				<div onClick={showDeleteConfirm}>{children}</div>
			)}
		</>
	);
}

export default React.memo(Confirm);
