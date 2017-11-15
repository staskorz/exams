import { compose, withProps, lifecycle } from 'recompose'


export default compose(
		withProps({
			loading: true,
		}),
		
		lifecycle({
			componentDidMount() {
				const { questionnaireId } = this.props.router.params
				
				fetch('/api/questionnaire-answers/' + questionnaireId)
						.then(response => response.json())
						.then(questionnaireAnswers => {
							this.setState({
								loading: false,
								questionnaireAnswers,
							})
						})
			},
		}),
)
