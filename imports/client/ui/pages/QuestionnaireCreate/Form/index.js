import React from 'react'
import { FormattedMessage } from 'react-intl';

import TextField from './TextField'
import Checkbox from './Checkbox'


export default () => <form>
	<TextField label={ <FormattedMessage id='name' /> } />
	<Checkbox label={ <FormattedMessage id='published' /> } />
</form>
