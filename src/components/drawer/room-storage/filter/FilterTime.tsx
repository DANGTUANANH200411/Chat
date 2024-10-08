import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { observer } from 'mobx-react';
import React from 'react';
import { useStores } from '../../../../stores/stores';

function FilterTime() {
	const {
		appStore: { $$ },
		chatStore: { setStorageFilter },
	} = useStores();
	const now = dayjs();
	const { RangePicker } = DatePicker;
	return (
		<RangePicker
			className='max-width'
			suffixIcon={<></>}
			ranges={{
				[$$('today')]: [now, now],
				[$$('last-n-days', { number: 7 })]: [now.subtract(7, 'd'), now],
				[$$('last-n-days', { number: 30 })]: [now.subtract(30, 'd'), now],
				[$$('last-n-months', { number: 3 })]: [now.subtract(3, 'month'), now],
				[$$('this-month')]: [now.startOf('month'), now.endOf('month')],
			}}
			format='DD/MM/YY'
			onChange={(dates) => {
				setStorageFilter({
					startTime: dates && dates[0] ? dates[0].format('YYYYMMDD000000') : undefined,
					endTime: dates && dates[1] ? dates[1].format('YYYYMMDD999999') : undefined,
				});
			}}
		/>
	);
}

export default React.memo(observer(FilterTime));
