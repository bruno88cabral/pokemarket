import React from 'react';
import { Cart } from '../../../components';
import { useRouter } from 'next/router';

const Marketplace = () => {
	const { query } = useRouter();

	return (
		<>
			{ query?.type && ( <Cart type={query.type} /> ) }
		</> 
	);
};

export default Marketplace;