const {MongoClient, ObjectId} = require("mongodb");

const url = 'mongodb://localhost:27017/testDB';
const client = new MongoClient(url);

async function run() {
    try {
        //await client.connect();
        const database = client.db('testDB');
        const content = database.collection('decisionTree');

        const query = {_id: new ObjectId('65a2a0cecd4ec77d85b61b48')};
        const result = await content.findOne(query);

        console.log(JSON.stringify(result, null, 2));
    } finally {
        await client.close();
    }
}
run().catch(console.dir);

// todo: write a function which queries the mongoDB and analyzes the edge connections
//  to update the map with the frequency of certain connections for recommender function.