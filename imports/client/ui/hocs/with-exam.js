import { compose, withProps, lifecycle } from 'recompose'


export default compose(
		withProps({
			loading: true,
		}),
		
		lifecycle({
			componentDidMount() {
				const { examId } = this.props.router.params
				
				fetch('/api/exams/' + examId).then(response => response.json()).then(exam => {
					this.setState({
						loading: false,
						exam,
					})
				})
			},
		}),
)
