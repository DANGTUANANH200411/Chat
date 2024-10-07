import { message, notification } from 'antd';

type Notify = 'success' | 'info' | 'warning' | 'error';
export const notify = (content: string, props?: Notify, duration = 2) => {
	switch (props) {
		case 'success':
			message.success(content, duration);
			break;
		case 'warning':
			message.warning(content, duration);
			break;
		case 'error':
			message.error(content, duration);
			break;
		default:
			message.info(content, duration);
			break;
	}
};
