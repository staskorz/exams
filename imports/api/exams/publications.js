import { Meteor } from 'meteor/meteor';

import collection from './collection';


Meteor.publish('exams', () => collection.find());
