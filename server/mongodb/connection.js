import { MongoClient } from 'mongodb'


const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017'
const DB_NAME = 'exams'


export default MongoClient.connect(MONGODB_URL).then(client => client.db(DB_NAME))
