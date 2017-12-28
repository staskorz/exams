const projection = {
	fields: {
		name: 1,
	},
}


export default (questionnairesCollection, questionnaireId) => questionnairesCollection.findOne({ _id: questionnaireId }, projection)
		.then(questionnaire => questionnaire && questionnaire.name ? questionnaire.name : null)
