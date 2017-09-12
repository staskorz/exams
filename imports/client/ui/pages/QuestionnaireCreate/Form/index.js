import React from 'react'
import { FormattedMessage } from 'react-intl'

import TextField from './TextField'
import Checkbox from './Checkbox'
import Question from './Question'


export default () => <form className='main-container-padding'>
	<TextField label={ <FormattedMessage id='questionnaireName' /> } />
	<Checkbox label={ <FormattedMessage id='published' /> } />
	
	<Question />
</form>
