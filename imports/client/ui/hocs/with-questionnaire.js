import { compose, withProps, lifecycle } from 'recompose'

import { findOne } from '../../../api/questionnaires/methods'


export default withQuestionnaire = compose(
		withProps({
			loading: true,
		}),
		
		lifecycle({
			componentDidMount() {
				const { questionnaireId } = this.props.router.params
				
				findOne.call({ questionnaireId }, (err, questionnaire) => {
					if(err) {
						console.log('questionnaires.findOne error:', err)
					} else {
						this.setState({
							loading: false,
							initialValue: questionnaire,
						})
					}
				})
			},
		}),
)
