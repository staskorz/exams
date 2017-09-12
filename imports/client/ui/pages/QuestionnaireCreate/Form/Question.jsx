import React from 'react'
import { Paper } from 'material-ui'
import { FormattedMessage } from 'react-intl'

import TextField from './TextField'
import Checkbox from './Checkbox'


const style = {
	fieldsContainer: {
		padding: '40px',
		paddingTop: '0',
	},
}


export default ({ value, onChange }) => <Paper>
	<div style={ style.fieldsContainer }>
		<TextField
				label={ <FormattedMessage id='questionBody' /> }
				multiLine={ true }
				rows={ 1 }
				rowsMax={ 7 }
				fullWidth
		/>
		
		<Checkbox label={ <FormattedMessage id='multipleChoice' /> } />
	</div>
</Paper>
