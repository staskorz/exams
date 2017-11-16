import express from 'express'
import path from 'path'

import dbConnection from './mongodb/connection'
import injectDbConnectionMiddleware from './mongodb/inject-connection-middleware'
import api from './api'


const HTTP_SERVER_PORT = 3000


const app = express()


dbConnection.then(db => {
	// eslint-disable-next-line no-console
	console.log('Connected to MongoDB')
	
	app.use(injectDbConnectionMiddleware(db))
	
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
