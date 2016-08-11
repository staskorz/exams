import { ValidatedMethod } from 'meteor/mdg:validated-method';

import collection from './collection';


export const insert = new ValidatedMethod({
	name: 'exams.insert',
	validate: collection.simpleSchema().validator(),
	run(record) {
		return collection.insert(record);
	}
});
