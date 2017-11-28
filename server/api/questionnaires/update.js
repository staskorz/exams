import validateId from '../../../common/validations/fields/id'
import validate from '../../../common/validations/questionnaire'
import sanitize from '../../../common/sanitizations/questionnaire'


export default (req, res) => {
	const questionnaireId = req.params['questionnaireId']
	
	if(!validateId(questionnaireId)) {
		res.status(500).send('Invalid id')
		
		throw new Error('Invalid id')
	}
	
	const { db } = req
	
	const questionnairesCollection = db.collection('Questionnaires')
	
	const questionnaire = req.body
	
	const { errorsDetected } = validate(questionnaire, f => f)
	
	if(errorsDetected) {
		res.status(500).send('Invalid data')
		
		throw new Error('Invalid data')
	}
	
	const sanitizedQuestionnaire = sanitize(questionnaire)
	
	questionnairesCollection.update({ _id: questionnaireId }, { $set: sanitizedQuestionnaire }).then(() => {
		res.status(200).send()
	}).catch(err => {
		const errorMessage = 'Error updating questionnaire DB record.'
		
		res.status(500).send(errorMessage)
		
		throw new Error(errorMessage + ' ' + err.name + ': ', err.message)
	})
}
