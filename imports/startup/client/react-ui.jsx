import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';

import ReactRoot from '/imports/client/ui/ReactRoot';


Meteor.startup(() => {
	render(<ReactRoot />, document.getElementById('render-target'));
});
