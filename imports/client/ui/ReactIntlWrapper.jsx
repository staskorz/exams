import React from 'react'
import { IntlProvider } from 'react-intl'

import he from '../translations/he'


export default ({ children }) => <IntlProvider locale='he' messages={ he }>
	{ children }
</IntlProvider>
