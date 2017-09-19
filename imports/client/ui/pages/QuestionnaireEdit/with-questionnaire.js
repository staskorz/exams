import { lifecycle } from 'recompose'

import { findOne } from '../../../../api/questionnaires/methods'


export default withQuestionnaire = lifecycle({
	componentDidMount() {
		this.setState({
			loading: true,
		})
		
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
})
