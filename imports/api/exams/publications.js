import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import collection from './collection';


Meteor.publish('exams', () => collection.find({}, { sort: { name: 1 } }));
