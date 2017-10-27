import { Router } from 'express'


const router = Router()


router.get('/', (req, res) => {
	const { db } = req
	
	const examsCollection = db.collection('Exams')
	
	examsCollection.count().then(count => {
		res.send('Exams Count: ' + count)
	})
})


export default router
