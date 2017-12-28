export default (req, res) => {
	const { db } = req
	
	const examsCollection = db.collection('Exams')
	
	const projection = {
		fields: {
			name: 1,
		},
	}
	
	examsCollection.find({ published: true }, projection).toArray().then(exams => {
		res.json(exams)
	}).catch(err => {
		const errorMessage = 'Error fetching published exams from DB.'
		
		res.status(500).send(errorMessage)
		
		throw new Error(errorMessage + ' ' + err.name + ': ', err.message)
	})
}
