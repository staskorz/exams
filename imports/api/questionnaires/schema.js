import { SimpleSchema } from 'meteor/aldeed:simple-schema'


const answer = new SimpleSchema({
	text: {
		type: String,
		min: 1,
		max: 500,
	},
	
	freeText: {
		type: Boolean,
		optional: true,
	},
})


const question = new SimpleSchema({
	text: {
		type: String,
		min: 1,
		max: 500,
	},
	
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
	
	name: {
		type: String,
		min: 1,
		max: 50,
	},
	
	published: {
		type: Boolean,
		optional: true,
	},
	
	createdAt: {
		type: Date,
		optional: true,
		autoValue: function() {
			if(this.isUpdate) {
				this.unset()
			} else {
				return new Date()
			}
		},
	},
	
	updatedAt: {
		type: Date,
		optional: true,
		autoValue: function() {
			return new Date()
		},
	},
	
	questions: {
		type: [question],
		minCount: 1,
	},
})
