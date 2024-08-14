import { Button, Col, Row, Typography } from 'antd';
import React from 'react';
import { User } from '../../utils/type';
import UserAvatar from './UserAvatar';
interface Props {
	user: User;
    info?: string;
    action?: React.ReactNode;
}
function Member(props: Props) {
	const { user, info, action } = props;
	return (
		<Row className='max-width member' align='middle' wrap={false}>
            <Col span={4}>
			    <UserAvatar id={user.id} className='member-avatar' />
            </Col>
			<Col span={20} className='member-info'>
				<Row wrap={false} justify='space-between' align='middle'>
                    <Row>
                        <Row className='max-width'>
                            <Typography.Text strong ellipsis>
                                {user.userName}
                            </Typography.Text>
                        </Row>
                        {info && (
                            <Row>
                                <Typography.Text className='text-small' ellipsis type='secondary'>{info}</Typography.Text>
                            </Row>
                        )}
                    </Row>
                    {action && (
                        <div className='member-action'>
                            {action}
                        </div>
                    )}
                </Row>
			</Col>
            
		</Row>
	);
}

export default React.memo(Member);
