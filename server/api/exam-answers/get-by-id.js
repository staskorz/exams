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
	
	const usersColleciton = db.collection('users')
	
	const usersProjection = {
		fields: {
			username: 1,
			englishName: 1,
			hebrewName: 1,
			employeeId: 1,
		},
	}
	
	const examAnswersCollection = db.collection('Answers')
	
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
		
		const userPromise = usersColleciton.findOne({ _id: answers.examineeUserId }, usersProjection)
		
		return Promise.all([answers, examPromise, userPromise])
	}).then(([answers, exam, user]) => {
		if(!exam) {
			res.status(404).send('Exam not found')
			
			return
		}
		
		if(!user) {
			res.status(404).send('Examinee not found')
			
			return
		}
		
		return [answers, exam, user]
	}).then(([answers, exam, user]) => {
		res.json({
			answers,
			exam: transformExamServerToClient(exam),
			user,
		})
	}).catch(err => {
		const errorMessage = 'Error fetching exam answers from DB.'
		
		res.status(500).send(errorMessage)
		
		throw new Error(errorMessage + ' ' + err.name + ': ', err.message)
	})
}
