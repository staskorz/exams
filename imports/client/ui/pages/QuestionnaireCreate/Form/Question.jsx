import React from 'react'
import { Paper } from 'material-ui'
import { FormattedMessage } from 'react-intl'

import NumberBadge from './NumberBadge'
import TextField from './TextField'
import Checkbox from './Checkbox'
import Answer from './Answer'


const style = {
	fieldsContainer: {
		padding: '40px',
		paddingTop: '0',
	},
	
	numberBadge: {
		marginTop: '12px',
		paddingTop: '0px',
	},
}


export default ({ number, value, onChange, style: propStyle }) => <Paper style={ { ...style, ...propStyle } }>
	<NumberBadge number={ number } style={ style.numberBadge } secondary />
	
	<div style={ style.fieldsContainer }>
		<TextField
				label={ <FormattedMessage id='questionBody' /> }
				multiLine={ true }
				rows={ 1 }
				rowsMax={ 7 }
				fullWidth
		/>
		
		<Checkbox label={ <FormattedMessage id='multipleChoice' /> } />
		<Answer number={ 1 } />
		<Answer number={ 2 } />
	</div>
</Paper>
