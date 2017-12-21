import React from 'react'
import { Snackbar } from 'material-ui'


export default ({ open, message, onRequestClose }) => <Snackbar
		autoHideDuration={ 4000 }
		open={ open }
		onRequestClose={ onRequestClose }
		message={ message }
/>
