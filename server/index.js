import 'dotenv/config'

import express from 'express'

import version from './version'
import setUserFromHeaderMiddleware from './express-middleware/set-user-from-header'
import noCacheMiddleware from './express-middleware/no-cache'
import dbConnection from './mongodb/connection'
import createIndexes from './mongodb/createIndexes'
import injectUserMiddleware from './express-middleware/inject-user'
import injectDbConnectionMiddleware from './mongodb/inject-connection-middleware'
import refreshUserMiddleware from './express-middleware/refresh-user'
import api from './api'


const { NODE_ENV, HTTP_PORT, NTLM_USER_OVERRIDE } = process.env


console.log('Version:', version)
console.log('NODE_ENV:', NODE_ENV)

NTLM_USER_OVERRIDE && console.log('NTLM_USER_OVERRIDE:', NTLM_USER_OVERRIDE)


const HTTP_SERVER_PORT = HTTP_PORT || 3000


const app = express()


dbConnection.then(createIndexes).then(db => {
	// eslint-disable-next-line no-console
	console.log('Connected to MongoDB')
	
	app.use(setUserFromHeaderMiddleware)
	
	const usersCollection = db.collection('users')
	
	app.use(injectUserMiddleware(usersCollection))
	
	if(!NTLM_USER_OVERRIDE) {
		app.use(refreshUserMiddleware(usersCollection))
	}
	
	app.use(injectDbConnectionMiddleware(db))
	
	app.use(noCacheMiddleware)
	
	app.use('/api', api)
	
	app.listen(HTTP_SERVER_PORT, () => {
		// eslint-disable-next-line no-console
		console.log('Express server listening on port', HTTP_SERVER_PORT)
	})
}).catch(({ message }) => {
	// eslint-disable-next-line no-console
	console.log('Error:', message)
	
	process.exit(1)
})
