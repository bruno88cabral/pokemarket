import axios from 'axios';
import { useState, useCallback } from 'react';
import { URL_API } from '../../contants';

const useRequest = uri => {
	const [data, setData] = useState({
		data: null,
		error: null,
		loading: false
	});
	const doRequest = useCallback(
		async (method, params) => {
			try {
				setData({
					data: null,
					error: false,
					loading: true
				});
				const response = await axios[method](`${URL_API}${params}`);
				setData({
					data: response.data,
					error: false,
					loading: false
				});
			} catch (err) {
				setData({
					data: null,
					error: {
						title: 'Unavailable server',
						message: 'Try again later'
					},
					loading: false
				});
			}
		},
		[uri]
	);

	return [data, doRequest];
};

export default useRequest;
