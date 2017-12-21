import { lifecycle } from 'recompose'


let componentNotify = null


export const notify = message => {
	if(componentNotify) {
		componentNotify(message)
	}
}


export default lifecycle({
	componentDidMount() {
		componentNotify = this.props.notify
	},
})
