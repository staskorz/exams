import { compose, withProps, lifecycle } from 'recompose'

import * as rest from '../../rest/index'


export default compose(
		withProps({
			loading: true,
		}),
		
		lifecycle({
			componentDidMount() {
				const { questionnaireId } = this.props.match.params
				
				rest.get('/api/questionnaire-answers/' + questionnaireId).then(questionnaireAnswers => {
					this.setState({
						loading: false,
						questionnaireAnswers,
					})
				})
			},
		}),
)
