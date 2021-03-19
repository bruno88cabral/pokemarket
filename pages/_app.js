/* eslint-disable react/prop-types */
import React from 'react';
import '../styles/globals.scss';
import { wrapper } from '../store';

function MyApp({ Component, pageProps }) {
	return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
