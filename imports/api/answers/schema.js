import { SimpleSchema } from 'meteor/aldeed:simple-schema';


export const question = new SimpleSchema({
	answers: {
		type: [Boolean],
		minCount: 2,
		maxCount: 4
	}
});


export default new SimpleSchema({
	_id: {
		type: SimpleSchema.RegEx.Id,
		optional: true,
		autoValue: function() {
			if(!this.isUpdate) {
				this.unset();
			}
		}
	},
	
	examId: {
		type: SimpleSchema.RegEx.Id
	},
	
	examTimestamp: {
		type: Date,
		optional: true,
		autoValue: function() {
			return new Date();
		}
	},
	
	examineeUserId: {
		type: SimpleSchema.RegEx.Id,
		optional: true,
		autoValue: function() {
			return this.userId;
		}
	},
	
	questions: {
		type: [question],
		minCount: 1
	},
	
	mark: {
		type: Number,
		min: 0,
		max: 100
	}
});
