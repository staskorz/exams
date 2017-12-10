export default (req, res) => {
	const { db } = req
	
	const usersCollection = db.collection('users')
	
	const projection = {
		fields: {
			username: 1,
			englishName: 1,
			hebrewName: 1,
			employeeId: 1,
			role: 1,
		},
		
		sort: {
			hebrewName: 1,
		},
	}
	
	usersCollection.find({}, projection).toArray().then(users => {
		res.json(users)
	}).catch(err => {
		const errorMessage = 'Error fetching users from DB.'
		
		res.status(500).send(errorMessage)
		
		throw new Error(errorMessage + ' ' + err.name + ': ', err.message)
	})
}
