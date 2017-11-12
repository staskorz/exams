import { Router } from 'express'


const router = Router()


router.get('/', (req, res) => {
	const { db } = req
	
	const examsCollection = db.collection('Exams')
	
	const fields = {
		name: 1,
		published: 1,
		createdAt: 1,
		updatedAt: 1,
	}
	
	examsCollection.find({}, fields).toArray().then(exams => {
		res.json(exams)
	}).catch(err => {
		const errorMessage = 'Error fetching exams from DB.'
		
		res.status(500).send(errorMessage)
		
		throw new Error(errorMessage + ' ' + err.name + ': ', err.message)
	})
})


router.get('/:examId', (req, res) => {
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
		
		res.json(exam)
	}).catch(err => {
		const errorMessage = 'Error fetching exam from DB.'
		
		res.status(500).send(errorMessage)
		
		throw new Error(errorMessage + ' ' + err.name + ': ', err.message)
	})
})


export default router
