export default (req, res) => {
	const { db } = req
	
	const questionnaireId = req.params['questionnaireId']
	
	const questionnairesCollection = db.collection('Questionnaires')
	
	const projection = {
		fields: {
			name: 1,
			description: 1,
			published: 1,
			questions: 1,
		},
	}
	
	questionnairesCollection.findOne({ _id: questionnaireId }, projection).then(questionnaire => {
		if(!questionnaire) {
			res.status(404).send('Questionnaire not found')
			
			return
		}
		
		res.json(questionnaire)
	}).catch(err => {
		const errorMessage = 'Error fetching questionnaire from DB.'
		
		res.status(500).send(errorMessage)
		
		throw new Error(errorMessage + ' ' + err.name + ': ', err.message)
	})
}
