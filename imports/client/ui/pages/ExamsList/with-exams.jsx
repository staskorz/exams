import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import Exams from '../../../../api/exams/collection'


export default component => createContainer(() => {
	const examsHandle = Meteor.subscribe('exams');
	
	if(examsHandle.ready()) {
		return {
			exams: Exams.find({}, { sort: { name: 1 } }).fetch(),
		}
	} else {
		return {
			loading: true,
		}
	}
}, component);
