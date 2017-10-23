import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import Questionnaires from '../../../../api/questionnaires/collection'


export default component => createContainer(() => {
	const questionnairesHandle = Meteor.subscribe('questionnaires');
	
	if(questionnairesHandle.ready()) {
		return {
			questionnaires: Questionnaires.find({}, { sort: { name: 1 } }).fetch(),
		}
	} else {
		return {
			loading: true,
		}
	}
}, component);
