import { lifecycle } from 'recompose'


export default lifecycle({
	state: {
		loading: true,
	},
	
	componentDidMount() {
		const { answersId } = this.props.router.params
		
		fetch('/api/exam-answers/' + answersId).then(response => {
			if(!response.ok) {
				throw new Error('Could not load exam answers')
			}
			
			return response
		}).then(response => response.json()).then(({ exam, answers, user }) => {
			this.setState({
				loading: false,
				exam,
				answers,
				user,
			})
		})
	},
})
