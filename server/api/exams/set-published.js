import validateId from '../../../common/validations/fields/id'


export default (req, res) => {
	const examId = req.params['examId']
	
	if(!validateId(examId)) {
		res.status(500).send('Invalid id')
		
		throw new Error('Invalid id')
	}
	
	const { db } = req
	
	const examsCollection = db.collection('Exams')
	
	const { published } = req.body
	
	examsCollection.update({ _id: examId }, {
		$set: {
			published: !!published,
		},
	}).then(() => {
		res.status(200).send()
	}).catch(err => {
		const errorMessage = 'Error updating exam DB record.'
		
		res.status(500).send(errorMessage)
		
		throw new Error(errorMessage + ' ' + err.name + ': ', err.message)
	})
}
