import React from 'react';
import { IntlProvider } from 'react-intl';


export default ({ children }) => (
		<IntlProvider locale='he'>
			{ children }
		</IntlProvider>
);
