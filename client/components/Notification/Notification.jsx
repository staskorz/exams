import React from 'react'
import { Snackbar } from 'material-ui'

import { neutral } from '../../util/colors'


const style = {
	snackbarBody: {
		backgroundColor: neutral,
	},
}


export default ({ open, message, onRequestClose }) => <Snackbar
		bodyStyle={ style.snackbarBody }
		autoHideDuration={ 4000 }
		open={ open }
		onRequestClose={ onRequestClose }
		message={ message }
/>
