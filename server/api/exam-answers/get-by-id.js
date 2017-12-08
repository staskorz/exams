import validateId from '../../../common/validations/fields/id'
import transformExamServerToClient from '../utils/transform-exam-server-to-client'

export default (req, res) => {
	const examAnswersId = req.params['examAnswersId']
	
	if(!validateId(examAnswersId)) {
		res.status(400).send('Invalid id')
		
		throw new Error('Invalid id')
	}
	
	const { db } = req
	
	const examsCollection = db.collection('Exams')
	
	const examsProjection = {
		fields: {
			name: 1,
			published: 1,
			createdAt: 1,
			updatedAt: 1,
			questions: 1,
		},
	} //TODO: make sure to transform the result
	
	const examAnswersCollection = db.collection('ExamAnswers')
	
	const examAnswersProjection = {
		fields: {
			mark: 1,
			examTimestamp: 1,
			examineeUserId: 1,
			questions: 1,
			examId: 1,
		},
	}
	
	examAnswersCollection.findOne({ _id: examAnswersId }, examAnswersProjection).then(answers => {
		if(!answers) {
			res.status(404).send('Exam answers not found')
			
			return
		}
		
		const examPromise = examsCollection.findOne({ _id: answers.examId }, examsProjection)
		
		return Promise.all([answers, examPromise])
	}).then(([answers, exam]) => {
		if(!exam) {
			res.status(404).send('Exam not found')
			
			return
		}
		
		return [answers, exam]
	}).then(([answers, exam]) => {
		res.json({
			answers,
			exam: transformExamServerToClient(exam),
		})
	}).catch(err => {
		const errorMessage = 'Error fetching exam answers from DB.'
		
		res.status(500).send(errorMessage)
		
		throw new Error(errorMessage + ' ' + err.name + ': ', err.message)
	})
}
