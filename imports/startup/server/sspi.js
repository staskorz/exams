import NodeSSPI from 'node-sspi';
import { WebApp } from 'meteor/webapp';


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

WebApp.rawConnectHandlers.use((req, res, next) => {
	console.log('attempting authentication');
	
	nodeSSPI.authenticate(req, res, err => {
		if(err) {
			console.log('err:', err);
		}
		
		if(res.finished) {
			console.log('session finished');
		}
		
		res.finished || next();
	});
});


WebApp.rawConnectHandlers.use((req, res, next) => {
	console.log('authenticated user:', req.connection.user);
	
	next();
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
//
//
// const port = 3091;
//
//
// app.listen(port, () => {
// 	console.log('Express server listening on port %d', port);
// });
