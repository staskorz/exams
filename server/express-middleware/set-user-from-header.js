export default (req, res, next) => {
	req.connection.user = req.headers['x-remote-user']
	
	next()
}
