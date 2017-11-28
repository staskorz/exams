import generateId from '../utils/generate-id'
import validateQuestionnaireAnswers from '../../../common/validations/questionnaire-answers'
import sanitize from '../../../common/sanitizations/questionnaire-answers'
import validateId from '../../../common/validations/fields/id'


export default (req, res) => {
	const { db } = req
	
	const questionnairesCollection = db.collection('Questionnaires')
	const questionnaireAnswersCollection = db.collection('QuestionnaireAnswers')
	
	const questionnaireAnswers = req.body
	
	const { questionnaireId } = questionnaireAnswers
	
	if(!validateId(questionnaireId)) {
		res.status(500).send('Invalid questionnaire ID')
		
		throw new Error('Invalid questionnaire ID')
	}
	
	const sanitizedQuestionnaireAnswers = sanitize(questionnaireAnswers)
	
	questionnairesCollection.findOne({ _id: questionnaireId }).then(questionnaire => {
		if(questionnaire) {
			return questionnaire
		} else {
			throw new Error('Questionnaire not found')
		}
	}).then(questionnaire => {
		const { errorsDetected } = validateQuestionnaireAnswers(questionnaireAnswers.questions, questionnaire, f => f)
		
		if(errorsDetected) {
			res.status(500).send('Invalid data')
			
			throw new Error('Invalid data')
		}
		
		return questionnaireAnswersCollection.insertOne({
			_id: generateId(),
			timestamp: new Date(),
			userId: '************', // TODO: must be populated with real user ID
			...sanitizedQuestionnaireAnswers,
		}).then(() => {
			res.status(200).send()
		})
	}).catch(err => {
		const errorMessage = 'Error inserting questionnaire answers DB record.'
		
		res.status(500).send(errorMessage)
		
		throw new Error(errorMessage + ' ' + err.name + ': ', err.message)
	})
}
