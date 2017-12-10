import { compose, withProps, lifecycle } from 'recompose'


export default compose(
		withProps({
			loading: true,
		}),
		
		lifecycle({
			componentDidMount() {
				const { userId } = this.props.router.params
				
				fetch('/api/exam-answers/user/' + userId).then(response => response.json()).then(examResults => {
					this.setState({
						loading: false,
						examResults,
					})
				})
			},
		}),
)
