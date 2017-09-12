import React from 'react'
import { FormattedMessage } from 'react-intl'

import TextField from './TextField'
import Checkbox from './Checkbox'
import Question from './Question'


const style = {
	question: {
		marginTop: '32px',
	},
}


export default () => <form className='main-container-padding'>
	<TextField label={ <FormattedMessage id='questionnaireName' /> } />
	<Checkbox label={ <FormattedMessage id='published' /> } />
	
	<Question number={ 1 } style={ style.question } />
</form>
