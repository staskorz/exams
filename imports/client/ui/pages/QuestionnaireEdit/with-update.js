import { withHandlers } from 'recompose'

//import { update } from '/imports/api/questionnaires/methods'


export default withHandlers({
	onSave: ({ value, router, router: { params: { questionnaireId } } }) => () => {
		//update.call({ ...value, _id: questionnaireId }, (error, result) => {
		//	if(error) {
		//		console.log('updateQuestionnaire error:', error)
		//	} else {
		//		router.push('/list-questionnaires')
		//	}
		//})
	},
})
