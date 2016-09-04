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


const examsFindOneSchema = new SimpleSchema({
	examId: {
		type: SimpleSchema.RegEx.Id
	}
});

export const findOne = new ValidatedMethod({
	name: 'exams.findOne',
	validate: examsFindOneSchema.validator(),
	run({ examId }) {
		return collection.findOne(examId);
	}
});


const examsGetBriefDetailsSchema = new SimpleSchema({
	examId: {
		type: SimpleSchema.RegEx.Id
	}
});

export const getBriefDetails = new ValidatedMethod({
	name: 'exams.getBriefDetails',
	validate: examsGetBriefDetailsSchema.validator(),
	run({ examId }) {
		return collection.findOne(examId, {
			fields: {
				name: 1,
				number: 1,
				"questions.{}": 1
			}
		});
	}
});
