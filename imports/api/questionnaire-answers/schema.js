import { SimpleSchema } from 'meteor/aldeed:simple-schema'


const answer = new SimpleSchema({
	checked: {
		type: Boolean,
	},
	
	freeText: {
		type: String,
		min: 1,
		max: 500,
		optional: true,
	},
})


const question = new SimpleSchema({
	answers: {
		type: [answer],
		minCount: 2,
		maxCount: 4,
	},
})


export default new SimpleSchema({
	_id: {
		type: SimpleSchema.RegEx.Id,
		optional: true,
		autoValue: function() {
			if(!this.isUpdate) {
				this.unset()
			}
		},
	},
	
	questionnaireId: {
		type: SimpleSchema.RegEx.Id,
	},
	
	timestamp: {
		type: Date,
		optional: true,
		autoValue: function() {
			return new Date()
		},
	},
	
	userId: {
		type: SimpleSchema.RegEx.Id,
		optional: true,
		autoValue: function() {
			return this.userId
		},
	},
	
	questions: {
		type: [question],
		minCount: 1,
	},
})
