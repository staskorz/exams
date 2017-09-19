import React from 'react'
import { FormattedMessage } from 'react-intl'


export default ({ question: { text, multipleChoice }, number, total }) => <div>
	<FormattedMessage id='questionNumberXofY' values={ { number, of: total } } />
	
	<h1>{ text }</h1>
</div> 
