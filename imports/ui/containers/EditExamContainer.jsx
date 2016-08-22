import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import Exams from '/imports/api/exams/collection';
import CreateExam from '/imports/ui/pages/CreateExam';


export default createContainer(({ examId }) => {
	const handle = Meteor.subscribe('exams.private.findOne', examId);
	const ready = handle.ready();
	const exam = ready ? Exams.findOne(examId) : {};
	
	return {
		ready,
		initialValues: exam,
		edit: true
	};
}, CreateExam);
