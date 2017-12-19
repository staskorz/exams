import { compose, withProps, lifecycle } from 'recompose'
import * as rest from '../../imports/client/rest/index'


export default compose(
		withProps({
			loading: true,
		}),
		
		lifecycle({
			componentDidMount() {
				const { questionnaireId } = this.props.router.params
				
				rest.get('/api/questionnaires/' + questionnaireId).then(questionnaire => {
					this.setState({
						loading: false,
						questionnaire,
					})
				})
			},
		}),
)
