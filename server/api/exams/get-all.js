export default (req, res) => {
	const { db, user } = req
	
	if(!user) {
		req.status('401').send('Unauthorized')
		
		return
	}
	
	if(user.role !== 'operator') {
		req.status('403').send('Access Denied')
		
		return
	}
	
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
}
