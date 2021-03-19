import { URL_IMG } from '../contants';

export const imageSrc = code => `${URL_IMG}${code}.png`;

export const randomValue = () => Number(Math.random() * 13).toFixed(2);

export const sumCartValue = cart => cart?.length > 0 && 
    cart.map(({ value }) => Number(value)).reduce((acc, current) => acc + current).toFixed(2);

export const groupBy = (objectArray, property) => {
	return objectArray?.reduce((acc, obj) => {
		let key = obj[property];

		if (!acc[key]) {
			acc[key] = [];
		}
		acc[key].push(obj);
		return acc;
	}, {});
};
