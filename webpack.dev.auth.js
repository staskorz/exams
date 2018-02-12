const NodeSSPI = require('node-sspi')


const { NTLM_USER_OVERRIDE } = process.env


const setUserInHeader = (req, user) => {
	req.headers['x-remote-user'] = user
}


const realNtlmAuthentication = nodeSSPI => (req, res, next) => {
	nodeSSPI.authenticate(req, res, err => {
		if(err) {
			console.log('Authentication Error:', err)
		}
		
		if(req.connection && req.connection.user) {
			setUserInHeader(req, req.connection.user)
		}
		
		res.finished || next()
	})
}


const fakeNtlmAuthentication = (req, res, next) => {
	setUserInHeader(req, NTLM_USER_OVERRIDE)
	
	next()
}


if(NTLM_USER_OVERRIDE) {
	module.exports = fakeNtlmAuthentication
} else {
	const nodeSSPI = new NodeSSPI()
	
	module.exports = realNtlmAuthentication(nodeSSPI)
}
