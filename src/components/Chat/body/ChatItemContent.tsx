import { observer } from 'mobx-react';
import React from 'react';
import { Message, ReactionType } from '../../../utils/type';
import { Row, Typography } from 'antd';
import { displayChatTime } from '../../../utils/dateHelper';
import { IMG_ANGRY, IMG_HEART, IMG_LIKE, IMG_SAD, IMG_WOW } from '../../../utils/constants';
interface Props {
	isFirst: boolean;
	isLast: boolean;
	message: Message;
	showTime: boolean;
	getUserName: (id: string) => string;
}
function ChatItemContent(props: Props) {
	const { isFirst, isLast, showTime, message, getUserName } = props;
	const { sender, content, deleted, createDate, logs } = message;

	const renderReaction = (e: ReactionType) => {
		switch(e){
			case 'LOVE':
				return <img src={IMG_HEART} />
			case 'SAD':
				return <img src={IMG_SAD} />
			case 'ANGRY':
				return <img src={IMG_ANGRY} />
			case 'WOW':
				return <img src={IMG_WOW} />
			default:
				return <img src={IMG_LIKE} />
		}
	}
	return (
		<>
			<Row
				align='middle'
				className='chat-item-content-wrapper'
			>
				<div className={`chat-item-content ${deleted && 'deleted'}`}>
					{isFirst && (
						<Typography.Link
							className='chat-item-username small-text text-ellipsis'
							onClick={() => {}}
						>
							{getUserName(sender)}
						</Typography.Link>
					)}
					<Row>
						<Typography.Text className='text-primary'>{content}</Typography.Text>
					</Row>
					{(isLast || showTime) && (
						<Typography.Text
							type='secondary'
							className='small-text'
						>
							{displayChatTime(createDate)}
						</Typography.Text>
					)}
						{/* <HeartOutlined className='reaction-action' /> */}
						{logs.length > 0 && (
							<div className='list-reaction'>
								{logs.map(e=> renderReaction(e.reaction))}
							</div>
						)}
				</div>
				<div className='chat-item-action'>Action</div>
			</Row>
		</>
	);
}

export default React.memo(observer(ChatItemContent));
