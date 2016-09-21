import sspiLogin from '/imports/client/sspi-login';


sspiLogin(err => {
	console.log('login error:', err);
});
