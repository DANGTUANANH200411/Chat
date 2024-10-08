import { Button, notification } from 'antd';
import { stores } from '../stores/stores';
import { newGuid } from './helper';

interface Props {
	count: number;
	callback: () => void;
}
export const openUndo = (props: Props) => {
	const { $$ } = stores.appStore;
	const { count, callback } = props;
	const key = newGuid();
	notification.open({
		key: key,
		message: $$('undo'),
		placement: 'bottomLeft',
		description: (
			<>
				<span>{$$('noti-del-msg', { number: count })}</span>
				<Button
					type='link'
					onClick={() => {
						callback();
						notification.destroy(key);
					}}
				>
					{$$('undo')}
				</Button>
			</>
		),
		pauseOnHover: true,
		showProgress: true,
	});
};
