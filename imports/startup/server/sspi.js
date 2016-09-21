import NodeSSPI from 'node-sspi';
import express from 'express';
import httpProxyMiddleware from 'http-proxy-middleware';


const app = express();


const nodeSSPI = new NodeSSPI();


// app.use((req, res, next) => {
// 	console.log('sending headers');
//	
// 	res.set({
// 		'Cache-Control': 'no-cache, no-store, must-revalidate',
// 		'Pragma': 'no-cache',
// 		'Expires': '0',
// 		'Access-Control-Allow-Origin': 'http://localhost:3000',
// 		// 'Access-Control-Allow-Headers': 'Authorization',
// 		// 'Access-Control-Allow-Methods': 'GET, OPTIONS',
// 		// 'Access-Control-Allow-Origin': '*',
// 		// 'Access-Control-Expose-Headers': 'WWW-Authenticate'
// 	});
//	
// 	next();
// });
//

app.use((req, res, next) => {
	nodeSSPI.authenticate(req, res, err => {
		if(err) {
			console.log('err:', err);
		}
		
		res.finished || next();
	});
});


// const upsertUser = async username => {
// 	const user = await Meteor.users.findOne({ username });
//	
// 	let userId;
//	
// 	if(user) {
// 		console.log('found user:', user);
//		
// 		userId = user._id;
// 	} else {
// 		userId = await Meteor.users.insert({ username });
// 	}
//	
// 	return userId;
// };
//
//
// app.use((req, res) => {
// 	const userWithDomain = req.connection.user;
//	
// 	console.log('Authenticated:', userWithDomain);
//	
// 	const username = userWithDomain.split('\\')[1];
//	
// 	res.send(username);
//	
// 	upsertUser(username).then(userId => {
// 		console.log('username:', username, 'userId:', userId);
//		
// 		res.end();
// 	}).catch(err => {
// 		console.log('err:', err);
//		
// 		res.end();
// 	});
// });


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
