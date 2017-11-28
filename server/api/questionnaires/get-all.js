export default (req, res) => {
	const { db } = req
	
	const questionnairesCollection = db.collection('Questionnaires')
	
	const fields = {
		name: 1,
		published: 1,
		createdAt: 1,
		updatedAt: 1,
	}
	
	questionnairesCollection.find({}, fields).toArray().then(questionnaires => {
		res.json(questionnaires)
	}).catch(err => {
		const errorMessage = 'Error fetching questionnaires from DB.'
		
		res.status(500).send(errorMessage)
		
		throw new Error(errorMessage + ' ' + err.name + ': ', err.message)
	})
}
