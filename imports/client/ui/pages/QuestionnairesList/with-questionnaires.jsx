import { lifecycle } from 'recompose'


export default lifecycle({
	state: {
		loading: true,
	},
	
	componentDidMount() {
		fetch('/api/questionnaires').then(response => response.json()).then(questionnaires => {
			this.setState({
				loading: false,
				questionnaires,
			})
		})
	},
})
