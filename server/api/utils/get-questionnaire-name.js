export default (questionnairesCollection, questionnaireId) => questionnairesCollection.findOne({ _id: questionnaireId }, { name: 1 })
		.then(questionnaire => questionnaire && questionnaire.name ? questionnaire.name : null)
