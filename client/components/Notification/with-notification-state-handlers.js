import { withStateHandlers } from 'recompose'


export default withStateHandlers({
	message: '',
	open: false,
}, {
	notify: () => message => ({
		message,
		open: true,
	}),
	
	onRequestClose: () => () => ({
		message: '',
		open: false,
	}),
})
