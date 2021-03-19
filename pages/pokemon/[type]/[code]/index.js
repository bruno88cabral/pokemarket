import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Perfil } from '../../../../components';

const Pokemon = () => {
	const { query } = useRouter();

	return (
		<>
			<Head>
				<title>Pokemon Market</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
    
			<Perfil
				code={query.code}
				type={query.type} 
			/>
		</>
	);
};

export default Pokemon;