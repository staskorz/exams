export default (req, res, next) => {
	const { user } = req
	
	if(user.role !== 'operator') {
		res.status(403).send('Access Denied')
		
		return
	}
	
	next()
}
