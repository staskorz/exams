import { compose, withProps, lifecycle } from 'recompose'

import * as rest from '../../../../../client/rest'


export default compose(
		withProps({
			loading: true,
		}),
		
		lifecycle({
			componentDidMount() {
				const { questionnaireId } = this.props.router.params
				
				rest.get('/api/questionnaire-answers/' + questionnaireId).then(questionnaireAnswers => {
					this.setState({
						loading: false,
						questionnaireAnswers,
					})
				})
			},
		}),
)
