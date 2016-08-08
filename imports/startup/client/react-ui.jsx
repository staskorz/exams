import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';

import ReactRoot from '/imports/ui/ReactRoot';

import '/imports/static/main.html';


Meteor.startup(() => {
	render(<ReactRoot />, document.getElementById('render-target'));
});
