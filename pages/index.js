import React from 'react';
import Head from 'next/head';
import { Welcome } from '../components';

export default function Home() {
	return (
		<>
			<Head>
				<title>Pokemon Market</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Welcome />
		</>
	);
}
