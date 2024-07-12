import { Button, Col, Row, Space, Typography } from 'antd';
import { observer } from 'mobx-react';
import { useStores } from '../../../stores/stores';
import { UserAddOutlined } from '@ant-design/icons';

function Members() {
	const {
		appStore: { $$ },
		chatStore: { Room },
	} = useStores();
	return (
		<div className='drawer drawer-members max-height'>
			<Row className='header' justify='center' align='middle'>
				<Typography.Text strong>{$$('members')}</Typography.Text>
			</Row>
			<Row style={{ padding: '.8rem' }}>
				<Space className='max-width' direction='vertical'>
					<Button className='max-width text-primary' icon={<UserAddOutlined />}>
						{$$('add-friends-to-group')}
					</Button>
					<Row>
						<Typography.Text strong>{`Listing members (${Room?.members.length})`}</Typography.Text>
					</Row>
				</Space>
			</Row>
		</div>
	);
}
export default observer(Members);
