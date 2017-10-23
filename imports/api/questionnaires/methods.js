import { ValidatedMethod } from 'meteor/mdg:validated-method'

import collection from './collection'
import getUserRole from '/imports/api/utils/get-user-role'


export const insert = new ValidatedMethod({
	name: 'questionnaires.insert',
	validate: collection.simpleSchema().validator(),
	run(record) {
		if(getUserRole(this.userId) !== 'operator') {
			throw new Meteor.Error('questionnaires.insert.notOperator', 'Available only for operators.')
		}
		
		return collection.insert(record)
	},
})


export const update = new ValidatedMethod({
	name: 'questionnaires.update',
	validate: collection.simpleSchema().validator(),
	run(record) {
		if(getUserRole(this.userId) !== 'operator') {
			throw new Meteor.Error('questionnaires.update.notOperator', 'Available only for operators.')
		}
		
		const { _id, ...rest } = record
		
		return collection.update({ _id: _id }, { $set: rest })
	},
})


const questionnaireFindOneSchema = new SimpleSchema({
	questionnaireId: {
		type: SimpleSchema.RegEx.Id,
	},
})

export const findOne = new ValidatedMethod({
	name: 'questionnaires.findOne',
	validate: questionnaireFindOneSchema.validator(),
	run({ questionnaireId }) {
		if(!this.userId) {
			throw new Meteor.Error('questionnaires.findOne.notLoggedIn', 'Must be logged in.')
		}
		
		const query = {
			_id: questionnaireId,
		}
		
		if(getUserRole(this.userId) !== 'operator') {
			query.published = true
		}
		
		return collection.findOne(query, {
			fields: {
				_id: 1,
				name: 1,
				description: 1,
				published: 1,
				questions: 1,
			},
		})
	},
})
