import { Meteor } from 'meteor/meteor';
import { initialize } from '/imports/client/ui/browserHistoryCounter';


Meteor.startup(() => {
	initialize();	
});
