import express from 'express'

import dbConnection from './mongodb/connection'


const HTTP_SERVER_PORT = 3000


const app = express()


let dbConnectionObj = null


const runWithDb = fn => dbConnectionObj ? fn(dbConnectionObj) : null


app.get('/', (req, res) => {
	//res.send('Hello world!')
	
	runWithDb(db => {
		const examsCollection = db.collection('Exams')
		
		examsCollection.count().then(count => {
			res.send('Exams Count: ' + count)
		})
	})
})


dbConnection.then(db => {
	// eslint-disable-next-line no-console
	console.log('Connected to MongoDB')
	
	dbConnectionObj = db
	
	app.listen(HTTP_SERVER_PORT, () => {
		// eslint-disable-next-line no-console
		console.log('Express server listening on port', HTTP_SERVER_PORT)
	})
}).catch(({ message }) => {
	// eslint-disable-next-line no-console
	console.log('Error:', message)
	
	process.exit(1)
})
