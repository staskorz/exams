import { lifecycle } from 'recompose'


export default lifecycle({
	state: {
		loading: true,
	},
	
	componentDidMount() {
		fetch('/api/users').then(response => response.json()).then(users => {
			this.setState({
				loading: false,
				users,
			})
		})
	},
})
