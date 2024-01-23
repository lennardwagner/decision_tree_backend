const {MongoClient, ObjectId} = require("mongodb");

const url = 'mongodb://localhost:27017/testDB';
const client = new MongoClient(url);

async function writeToDB(file) {
    try {
        await client.connect();
        const database = client.db('testDB');
        const content = database.collection('decisionTree');

        const result = await content.insertOne(file);

        //console.log(JSON.stringify(result, null, 2));
    } finally {
        await client.close();
    }
}
module.exports = writeToDB;