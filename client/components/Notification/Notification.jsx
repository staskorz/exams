import React from 'react'
import { Snackbar } from 'material-ui'


export default ({ open, message, handleCloseRequest }) => <Snackbar
		autoHideDuration={ 4000 }
		open={ open }
		onRequestClose={ handleCloseRequest }
		message={ message }
/>
