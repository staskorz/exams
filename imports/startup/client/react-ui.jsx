import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';

import Routes from '../../ui/Routes';

import '../../static/main.html';


Meteor.startup(() => {
	render(<Routes />, document.getElementById('render-target'));
});
