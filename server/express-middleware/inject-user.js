export default usersCollection => (req, res, next) => {
	const rawUsername = req.connection.user
	
	if(!rawUsername) {
		next()
		
		return
	}
	
	const username = rawUsername.toLowerCase()
	
	const projection = {
		fields: {
			role: 1,
			englishName: 1,
			hebrewName: 1,
			employeeId: 1,
		},
	}
	
	usersCollection.findOne({ username }, projection).then(user => {
		if(!user) {
			next()
			
			console.log('User not found')
			
			return
		}
		
		const { _id, role, englishName, hebrewName, employeeId } = user
		
		req.user = {
			_id,
			role,
			englishName,
			hebrewName,
			employeeId,
		}
		
		next()
	}).catch(err => {
		console.log('Error fetching user:', err)
		
		next()
	})
}
