import transformServerToClient from './transform-server-to-client'


export default (req, res) => {
	const { db } = req
	
	const examId = req.params['examId']
	
	const examsCollection = db.collection('Exams')
	
	const fields = {
		name: 1,
		published: 1,
		questions: 1,
	}
	
	examsCollection.findOne({ _id: examId }, fields).then(exam => {
		if(!exam) {
			res.status(404).send('Exam not found')
			
			return
		}
		
		const transformedExam = transformServerToClient(exam)
		
		res.json(transformedExam)
	}).catch(err => {
		const errorMessage = 'Error fetching exam from DB.'
		
		res.status(500).send(errorMessage)
		
		throw new Error(errorMessage + ' ' + err.name + ': ', err.message)
	})
}
