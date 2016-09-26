import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';


export default component => createContainer(() => ({ currentUser: Meteor.user() }), component);
