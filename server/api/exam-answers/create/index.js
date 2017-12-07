import generateId from '../../utils/generate-id'
import validateExamAnswers from '../../../../common/validations/exam-answers'
import sanitize from '../../../../common/sanitizations/exam-answers'
import validateId from '../../../../common/validations/fields/id'

import getExamAnswersCorrectness from './get-exam-answers-correctness'
import calculateExamMark from './calculate-exam-mark'


export default (req, res) => {
	const examId = req.params['examId']
	
	if(!validateId(examId)) {
		res.status(500).send('Invalid exam ID')
		
		throw new Error('Invalid exam ID')
	}
	
	const { db } = req
	
	const examsCollection = db.collection('Exams')
	const examAnswersCollection = db.collection('Answers')
	
	const examAnswers = req.body
	
	const sanitizedExamAnswers = sanitize(examAnswers)
	
	return examsCollection.findOne({ _id: examId, published: true }).then(exam => {
		if(exam) {
			return exam
		} else {
			throw new Error('Exam not found')
		}
	}).then(exam => {
		const valid = validateExamAnswers(exam.questions, sanitizedExamAnswers)
		
		if(!valid) {
			res.status(500).send('Invalid data')
			
			throw new Error('Invalid data')
		}
		
		const examAnswersCorrectness = getExamAnswersCorrectness(exam.questions, sanitizedExamAnswers)
		
		const mark = calculateExamMark(exam.questions, examAnswersCorrectness)
		
		const questions = sanitizedExamAnswers.map((answers, index) => ({
			answers,
			correct: examAnswersCorrectness[index],
		}))
		
		return examAnswersCollection.insertOne({
			_id: generateId(),
			examId,
			mark,
			questions,
			examTimestamp: new Date(),
			examineeUserId: 'v3baYiqaLDYA2SodD', // TODO: must be populated with real user ID
		}).then(() => {
			res.json({
				mark,
			})
		})
	}).catch(err => {
		const errorMessage = 'Error inserting exam answers DB record.'
		
		res.status(500).send(errorMessage)
		
		throw new Error(errorMessage + ' ' + err.name + ': ', err.message)
	})
}
