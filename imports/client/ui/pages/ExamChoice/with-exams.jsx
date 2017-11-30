import { lifecycle } from 'recompose'


export default lifecycle({
	state: {
		loading: true,
	},
	
	componentDidMount() {
		fetch('/api/exams/published').then(response => response.json()).then(exams => {
			this.setState({
				loading: false,
				exams,
			})
		})
	},
})
