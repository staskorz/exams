import { compose, withProps, lifecycle } from 'recompose'


export default compose(
		withProps({
			loading: true,
		}),
		
		lifecycle({
			componentDidMount() {
				const { questionnaireId } = this.props.router.params
				
				fetch('/api/questionnaires/' + questionnaireId).then(response => response.json()).then(questionnaire => {
					this.setState({
						loading: false,
						questionnaire,
					})
				})
			},
		}),
)
