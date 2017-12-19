import React from 'react'
import { IntlProvider, addLocaleData } from 'react-intl'
import heLocale from 'react-intl/locale-data/he'

import heMessages from '../../../client/translations/he'


addLocaleData([...heLocale])


export default ({ children }) => <IntlProvider locale='he' messages={ heMessages }>
	{ children }
</IntlProvider>
