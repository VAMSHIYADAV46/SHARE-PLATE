const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const collections = require('./collections');
dotenv.config();


const client = new MongoClient(
  `mongodb+srv://mrwander46_db_user:${encodeURIComponent(process.env.MONGO_ATLAS_PASSWORD)}@shareplate.axyqvuu.mongodb.net/shareplate?retryWrites=true&w=majority&appName=SharePlate`
);

let db; // cache the connection

async function connectToMongoDB() {
    if (!db) {
        let mongo_connection = await client.connect();
        db = mongo_connection.db(process.env.MONGO_ATLAS_DATABASE_NAME);
    }
    return db;
}

async function getUsersCollection() {
    let db_connection = await connectToMongoDB();
    return db_connection.collection(collections.USERS);
}

module.exports = {
  getUsersCollection
};
