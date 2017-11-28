import generateId from '../utils/generate-id'
import validate from '../../../common/validations/questionnaire'
import sanitize from '../../../common/sanitizations/questionnaire'


export default (req, res) => {
	const { db } = req
	
	const questionnairesCollection = db.collection('Questionnaires')
	
	const questionnaire = req.body
	
	const { errorsDetected } = validate(questionnaire, f => f)
	
	if(errorsDetected) {
		res.status(500).send('Invalid data')
		
		throw new Error('Invalid data')
	}
	
	const sanitizedQuestionnaire = sanitize(questionnaire)
	
	questionnairesCollection.insertOne({ _id: generateId(), ...sanitizedQuestionnaire }).then(() => {
		res.status(200).send()
	}).catch(err => {
		const errorMessage = 'Error inserting questionnaire DB record.'
		
		res.status(500).send(errorMessage)
		
		throw new Error(errorMessage + ' ' + err.name + ': ', err.message)
	})
}
