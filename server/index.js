import express from 'express'
import path from 'path'

import ntlmAuthenticationMiddleware from './express-middleware/ntlm-authentication'
import setUserFromHeaderMiddleware from './express-middleware/set-user-from-header'
import noCacheMiddleware from './express-middleware/no-cache'
import dbConnection from './mongodb/connection'
import injectUserMiddleware from './express-middleware/inject-user'
import injectDbConnectionMiddleware from './mongodb/inject-connection-middleware'
import api from './api'


const { NODE_ENV } = process.env


console.log('NODE_ENV:', NODE_ENV)


const HTTP_SERVER_PORT = 3000


const app = express()


dbConnection.then(db => {
	// eslint-disable-next-line no-console
	console.log('Connected to MongoDB')
	
	if(NODE_ENV === 'development') {
		// the NTLM authentication is done in webpack-dev-server and passed as a header
		app.use(setUserFromHeaderMiddleware)
	} else {
		app.use(ntlmAuthenticationMiddleware)
	}
	
	const usersCollection = db.collection('users')
	
	app.use(injectUserMiddleware(usersCollection))
	
	app.use(injectDbConnectionMiddleware(db))
	
	app.use(noCacheMiddleware)
	
	app.use('/api', api)
	
	const staticResourcesPath = path.join(__dirname, '..', 'client')
	
	app.use(express.static(staticResourcesPath))
	
	app.get('*', (req, res) => res.sendFile(path.join(staticResourcesPath, 'index.html')))
	
	app.listen(HTTP_SERVER_PORT, () => {
		// eslint-disable-next-line no-console
		console.log('Express server listening on port', HTTP_SERVER_PORT)
	})
}).catch(({ message }) => {
	// eslint-disable-next-line no-console
	console.log('Error:', message)
	
	process.exit(1)
})
