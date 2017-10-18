import { Meteor } from 'meteor/meteor'
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

import collection from './collection'
import schema from './schema'


export const insert = new ValidatedMethod({
	name: 'questionnaireAnswers.insert',
	validate: schema.validator(),
	run(answeredQuestionnaire) {
		if(!this.userId) {
			throw new Meteor.Error('questionnaireAnswers.insert.notLoggedIn', 'Must be logged in.')
		}
		
		collection.insert(answeredQuestionnaire)
	},
})
