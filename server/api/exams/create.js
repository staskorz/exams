import generateId from '../utils/generate-id'
import validate from '../../../common/validations/exam'
import sanitize from '../../../common/sanitizations/exam'


export default (req, res) => {
	const { db } = req
	
	const examsCollection = db.collection('Exams')
	
	const exam = req.body
	
	const { errorsDetected } = validate(exam, f => f)
	
	if(errorsDetected) {
		res.status(500).send('Invalid data')
		
		throw new Error('Invalid data')
	}
	
	const sanitizedExam = sanitize(exam)
	
	const timestamp = new Date()
	
	examsCollection.insertOne({
		_id: generateId(),
		createdAt: timestamp,
		updatedAt: timestamp,
		...sanitizedExam,
	}).then(() => {
		res.status(200).send()
	}).catch(err => {
		const errorMessage = 'Error inserting exam DB record.'
		
		res.status(500).send(errorMessage)
		
		throw new Error(errorMessage + ' ' + err.name + ': ', err.message)
	})
}
