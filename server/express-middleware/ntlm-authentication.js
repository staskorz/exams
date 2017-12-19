const NodeSSPI = require('node-sspi')


const { NTLM_USER_OVERRIDE } = process.env


const realNtlmAuthentication = nodeSSPI => (req, res, next) => {
	nodeSSPI.authenticate(req, res, err => {
		if(err) {
			console.log('Authentication Error:', err)
		}
		
		res.finished || next()
	})
}


const fakeNtlmAuthentication = (req, res, next) => {
	req.connection.user = NTLM_USER_OVERRIDE
	
	next()
}


module.exports = () => {
	if(NTLM_USER_OVERRIDE) {
		return fakeNtlmAuthentication
	} else {
		const nodeSSPI = new NodeSSPI()
		
		return realNtlmAuthentication(nodeSSPI)
	}
}
