import express from 'express'


const HTTP_SERVER_PORT = 3000


const app = express()


app.get('/', (req, res) => {
	res.send('Hello world!')
})


app.listen(HTTP_SERVER_PORT, () => {
	// eslint-disable-next-line no-console
	console.log('Express server listening on port', HTTP_SERVER_PORT)
})
