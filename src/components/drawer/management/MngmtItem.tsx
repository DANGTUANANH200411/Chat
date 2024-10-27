import { QuestionCircleOutlined } from '@ant-design/icons';
import { Checkbox, Row, Switch, Tooltip, Typography } from 'antd';
import React from 'react';

interface Props {
	title: string;
	checked?: boolean;
	useSwitch?: true | boolean;
	explain?: string;
	disabled?: true | boolean;
	onChange: (checked: boolean) => void;
}
function MngmtItem(props: Props) {
	const { title, checked, useSwitch, explain, disabled, onChange } = props;
	return (
		<Row className='management-item'>
			<Typography.Paragraph ellipsis={{ rows: 2 }} title={title} className='flex-grow'>
				{title}{' '}
				{explain && (
					<Tooltip title={explain}>
						<QuestionCircleOutlined />
					</Tooltip>
				)}
			</Typography.Paragraph>
			{useSwitch ? (
				<Switch disabled={disabled} checked={checked} onChange={onChange} />
			) : (
				<Checkbox disabled={disabled} checked={checked} onChange={(e) => onChange(e.target.checked)} />
			)}
		</Row>
	);
}

export default React.memo(MngmtItem);
