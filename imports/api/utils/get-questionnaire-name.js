import questionnairesCollection from '../exams/collection';


export default questionnaireId => {
	const questionnaire = questionnairesCollection.findOne({ _id: questionnaireId }, { name: 1 });
	
	if(questionnaire && questionnaire.name) {
		return questionnaire.name;
	} else {
		return null;
	}
}
