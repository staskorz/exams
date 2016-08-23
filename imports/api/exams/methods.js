import { ValidatedMethod } from 'meteor/mdg:validated-method';

import collection from './collection';


export const insert = new ValidatedMethod({
	name: 'exams.insert',
	validate: collection.simpleSchema().validator(),
	run(record) {
		return collection.insert(record);
	}
});


export const update = new ValidatedMethod({
	name: 'exams.update',
	validate: collection.simpleSchema().validator(),
	run(record) {
		const { _id, ...rest } = record;
		
		return collection.update({ _id: _id }, { $set: rest });
	}
});
