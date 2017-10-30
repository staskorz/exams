const fields = {
	username: 1,
	englishName: 1,
	hebrewName: 1,
	employeeId: 1,
}


export default usersCollection => usersCollection.find({}, fields).toArray()
		.then(users => users.reduce((acc, { _id, ...rest }) => ({
			...acc,
			[_id]: rest,
		}), {})).catch(err => {
			console.log('err:', err)
		})
