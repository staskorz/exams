import validateId from '../../../common/validations/fields/id'

import transformServerToClient from './transform-server-to-client'


const hasMultipleCorrectAnswers = answers => answers.reduce((acc, { correct }) => correct ? acc + 1 : acc, 0) > 1


const transformForExaminee = ({ questions, ...rest }) => ({
	questions: questions.map(({ text, answers, images }) => ({
		text,
		answers: answers.map(({ text }) => (text)),
		images,
		multiple: hasMultipleCorrectAnswers(answers),
	})),
	
	...rest,
})


export default (req, res) => {
	const examId = req.params['examId']
	
	if(!validateId(examId)) {
		res.status(500).send('Invalid id')
		
		throw new Error('Invalid id')
	}
	
	const { db } = req
	
	const examsCollection = db.collection('Exams')
	
	const fields = {
		name: 1,
		'questions.text': 1,
		'questions.answers': 1,
		'questions.images': 1,
	}
	
	examsCollection.findOne({ _id: examId, published: true }, fields).then(exam => {
		if(!exam) {
			res.status(404).send('Exam not found')
			
			return
		}
		
		const transformedExam = transformServerToClient(exam)
		
		const examineeVersion = transformForExaminee(transformedExam)
		
		res.json(examineeVersion)
	}).catch(err => {
		const errorMessage = 'Error fetching exam from DB.'
		
		res.status(500).send(errorMessage)
		
		throw new Error(errorMessage + ' ' + err.name + ': ', err.message)
	})
}
