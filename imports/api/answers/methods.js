import { ValidatedMethod } from 'meteor/mdg:validated-method';

import answersCollection from './collection';


export const insert = new ValidatedMethod({
	name: 'answers.insert',
	validate: answersCollection.simpleSchema().validator(),
	run(record) {
		return answersCollection.insert(record);
	}
});
