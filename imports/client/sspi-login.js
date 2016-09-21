import { Accounts } from 'meteor/accounts-base';


export default userCallback => {
	const loginRequest = {
		sspi: true
	};
	
	Accounts.callLoginMethod({
		methodArguments: [loginRequest],
		userCallback
	});
};
