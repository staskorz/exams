import { SimpleSchema } from 'meteor/aldeed:simple-schema';


const answer = new SimpleSchema({
	text: {
		type: String,
		min: 1
	},
	
	correct: {
		type: Boolean
	}
});


const question = new SimpleSchema({
	text: {
		type: String,
		min: 1
	},
	
	answers: {
		type: [answer],
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
	
	name: {
		type: String,
		min: 1
	},
	
	number: {
		type: Number,
		decimal: true
	},
	
	questions: {
		type: [question],
		minCount: 1
	}
});
