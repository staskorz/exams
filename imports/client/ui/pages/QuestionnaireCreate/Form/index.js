import React from 'react'
import { FormattedMessage } from 'react-intl';

import TextField from './TextField'


export default () => <form>
	<TextField floatingLabelText={ <FormattedMessage id='name' /> } />
</form>
