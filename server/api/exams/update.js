import validateId from '../../../common/validations/fields/id'
import validate from '../../../common/validations/exam'
import sanitize from '../../../common/sanitizations/exam'


export default (req, res) => {
	const examId = req.params['examId']
	
	if(!validateId(examId)) {
		res.status(500).send('Invalid id')
		
		throw new Error('Invalid id')
	}
	
	const { db } = req
	
	const examsCollection = db.collection('Exams')
	
	const exam = req.body
	
	const { errorsDetected } = validate(exam, f => f)
	
	if(errorsDetected) {
		res.status(500).send('Invalid data')
		
		throw new Error('Invalid data')
	}
	
	const sanitizedExam = sanitize(exam)
	
	examsCollection.update({ _id: examId }, {
		$set: {
			updatedAt: new Date(),
			...sanitizedExam,
		},
	}).then(() => {
		res.status(200).send()
	}).catch(err => {
		const errorMessage = 'Error updating exam DB record.'
		
		res.status(500).send(errorMessage)
		
		throw new Error(errorMessage + ' ' + err.name + ': ', err.message)
	})
}
