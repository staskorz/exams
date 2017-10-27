import { Router } from 'express'


const router = Router()


router.get('/', (req, res) => {
	const { db } = req
	
	const examsCollection = db.collection('Exams')
	
	examsCollection.count().then(count => {
		res.send('Exams Count: ' + count)
	}).catch(err => {
		const errorMessage = 'Error fetching exams from DB.'

		res.status(500).send(errorMessage)

		throw new Error(errorMessage + ' ' + err.name + ': ', err.message)
	})
})


export default router
