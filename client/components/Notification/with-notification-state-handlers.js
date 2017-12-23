import { withStateHandlers } from 'recompose'


export default withStateHandlers({
	message: '',
	open: false,
	queue: [],
}, {
	notify: ({ open, queue }) => message => {
		if(open) {
			return {
				queue: [ ...queue, message ],
			}
		} else {
			return {
				message,
				open: true,
			}
		}
	},
	
	onRequestClose: ({ queue }) => reason => {
		if(reason === 'clickaway') {
			return
		}
		
		if(queue.length > 0) {
			const [ message, ...rest ] = queue
			
			return {
				message,
				open: true,
				queue: rest,
			}
		} else {
			return {
				message: '',
				open: false,
			}
		}
	},
})
