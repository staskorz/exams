import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import Exams from '/imports/api/exams/collection';
import ExamsList from '/imports/client/ui/pages/ExamsList';


export default createContainer(() => {
	const examsHandle = Meteor.subscribe('exams');
	const ready = examsHandle.ready();
	const exams = ready ? Exams.find({}, { sort: { name: 1 } }).fetch() : [];
	
	return {
		ready,
		exams
	};
}, ExamsList);
