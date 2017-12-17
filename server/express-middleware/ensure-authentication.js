export default (req, res, next) => {
	const { user } = req
	
	if(!user) {
		res.status(500).send('User Unknown')
		
		return
	}
	
	next()
}
