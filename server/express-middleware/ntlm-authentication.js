const NodeSSPI = require('node-sspi')


const nodeSSPI = new NodeSSPI()


module.exports = (req, res, next) => {
	nodeSSPI.authenticate(req, res, err => {
		if(err) {
			console.log('Authentication Error:', err)
		}
		
		res.finished || next()
	})
}
