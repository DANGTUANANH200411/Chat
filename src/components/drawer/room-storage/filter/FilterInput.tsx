import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { useStores } from '../../../../stores/stores';
import { DELAY_INPUT } from '../../../../utils/constants';

function FilterInput() {
	const {
		appStore: { $$ },
		chatStore: { setStorageFilter },
	} = useStores();

	const [value, setValue] = useState<string>('');

	useEffect(() => {
		const timer = setTimeout(() => {
			setStorageFilter({ searchText: value });
		}, DELAY_INPUT);

		return () => clearTimeout(timer);
	}, [value]);
	return (
		<Input
			allowClear
			value={value}
			prefix={<SearchOutlined />}
			placeholder={$$('search')}
			onChange={(e) => setValue(e.target.value)}
		/>
	);
}

export default React.memo(observer(FilterInput));
