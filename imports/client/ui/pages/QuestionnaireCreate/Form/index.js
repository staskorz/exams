import React from 'react'
import { FormattedMessage } from 'react-intl';

import TextField from './TextField'


export default () => <form>
	<TextField label={ <FormattedMessage id='name' /> } />
</form>
