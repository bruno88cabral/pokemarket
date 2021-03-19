import React from 'react';
import { Market } from '../../../components';
import { useRouter } from 'next/router';

const Marketplace = () => {
	const { query } = useRouter();    

	return (
		<>
			{ query?.type && ( <Market type={query.type} /> ) } 
		</>
	);
};

export default Marketplace;