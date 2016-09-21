import NodeSSPI from 'node-sspi';
import express from 'express';
import httpProxyMiddleware from 'http-proxy-middleware';


const app = express();


const nodeSSPI = new NodeSSPI();


app.use((req, res, next) => {
	nodeSSPI.authenticate(req, res, err => {
		if(err) {
			console.log('err:', err);
		}
		
		res.finished || next();
	});
});


const meteorProxy = httpProxyMiddleware({
	target: 'http://localhost:3000/',
	ws: true,
	onProxyReq: (proxyReq, { connection: { user } }) => {
		console.log('req.connection.user:', user);
		
		proxyReq.setHeader('x-connection-user', user);
	}
});


app.use(meteorProxy);


const proxyPort = 3091;


app.listen(proxyPort, () => {
	console.log('Express server listening on port %d', proxyPort);
});
