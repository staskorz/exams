import { compose, withProps, lifecycle } from 'recompose'


export default compose(
		withProps({
			loading: true,
		}),
		
		lifecycle({
			componentDidMount() {
				const { examId } = this.props.router.params
				
				fetch('/api/exam-answers/' + examId).then(response => response.json()).then(examResults => {
					this.setState({
						loading: false,
						examResults,
					})
				})
			},
		}),
)
