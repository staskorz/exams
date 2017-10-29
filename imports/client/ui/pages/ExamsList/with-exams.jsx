import { lifecycle } from 'recompose'


export default lifecycle({
	state: {
		loading: true,
	},
	
	componentDidMount() {
		fetch('/api/exams').then(response => response.json()).then(exams => {
			this.setState({
				loading: false,
				exams,
			})
		})
	},
})
