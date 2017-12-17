export default (req, res, next) => {
	// the following header must be set by webpack-dev-server
	req.connection.user = req.headers['webpack-dev-server-ntlm-user']
	
	next()
}
