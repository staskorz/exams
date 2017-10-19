import { compose, withProps, lifecycle } from 'recompose'

import { getQuestionnaireResults } from '../../../../api/questionnaire-answers/methods'


export default withQuestionnaireAnswers = compose(
		withProps({
			loading: true,
		}),
		
		lifecycle({
			componentDidMount() {
				const { questionnaireId } = this.props.router.params
				
				getQuestionnaireResults.call({ questionnaireId }, (err, questionnaireAnswers) => {
					if(err) {
						console.log('questionnaireAnswers.getQuestionnaireResults error:', err)
					} else {
						this.setState({
							loading: false,
							questionnaireAnswers,
						})
					}
				})
			},
		}),
)
