import { Mongo } from 'meteor/mongo';

import schema from './schema';


const collection = new Mongo.Collection('Answers');

collection.attachSchema(schema);

export default collection;
