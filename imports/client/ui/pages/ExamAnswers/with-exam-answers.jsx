import { lifecycle } from 'recompose'


export default lifecycle({
	state: {
		loading: true,
	},
	
	componentDidMount() {
		const { examId } = this.props.router.params
		
		fetch('/api/exams-answers/' + examId).then(response => {
			if(!response.ok) {
				throw new Error('Could not load exam answers')
			}
			
			return response
		}).then(response => response.json()).then(({ exam, answers }) => {
			this.setState({
				loading: false,
				exam,
				answers,
			})
		})
	},
})
