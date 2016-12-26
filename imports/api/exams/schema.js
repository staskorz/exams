import { SimpleSchema } from 'meteor/aldeed:simple-schema';


const answer = new SimpleSchema({
	text: {
		type: String,
		min: 1,
		max: 500
	},
	
	correct: {
		type: Boolean,
		optional: true
	}
});


const image = new SimpleSchema({
	imageBlob: {
		type: Object,
		blackbox: true
	},
	
	width: {
		type: Number,
		min: 1
	},
	
	height: {
		type: Number,
		min: 1
	}
});


const question = new SimpleSchema({
	weight: {
		type: Number,
		min: 1,
		max: 100
	},
	
	text: {
		type: String,
		min: 1,
		max: 500
	},
	
	answers: {
		type: [answer],
		minCount: 2,
		maxCount: 4
	},
	
	images: {
		type: [image],
		maxCount: 4,
		optional: true
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
		min: 1,
		max: 50
	},
	
	published: {
		type: Boolean,
		optional: true
	},
	
	createdAt: {
		type: Date,
		optional: true,
		autoValue: function() {
			if(this.isUpdate) {
				this.unset();
			} else {
				return new Date();
			}
		}
	},
	
	updatedAt: {
		type: Date,
		optional: true,
		autoValue: function() {
			return new Date();
		}
	},
	
	questions: {
		type: [question],
		minCount: 1
	}
});
