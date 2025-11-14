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

async function getMessagesCollection() {
    let db_connection = await connectToMongoDB();
    return db_connection.collection(collections.MESSAGES);
}

async function getDonationsCollection() {
    let db_connection = await connectToMongoDB();
    return db_connection.collection(collections.DONATIONS);
}

async function storeDonation(donation) {
    try {
        const donationCollection = await getDonationsCollection();
        const result = await donationCollection.insertOne(donation);
        return {
            success: result.acknowledged,
            id: result.insertedId
        };
    } catch (error) {
        console.log("Error storing the donation", error.message);
        throw error;
    }
}



async function fetchDonation(donation) {
    try {
        const collection = await getDonationsCollection();
        const result = await collection.findOne(donation);
        return result;
    } catch (error) {
        console.log("Error fetching the food items", error.message);
        throw error;
    }
}


module.exports = {
  getUsersCollection,
  getMessagesCollection,
  getDonationsCollection,
  storeDonation
};
