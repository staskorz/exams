import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';

import MaterialUiWrapper from '../../ui/MaterialUiWrapper';

import '../../static/main.html';


Meteor.startup(() => {
	render(<MaterialUiWrapper />, document.getElementById('render-target'));
});
