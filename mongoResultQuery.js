const { MongoClient } = require("mongodb");

const queryObject = [
    {
        alter: { '$gt': 30 },
        geschlecht: 'männlich'
    },
    {
        alter: { '$lte': 25 },
        gewicht: { '$gte': 50 }
    }
]

async function queryCollection(queryObject) {
    const url = 'mongodb://localhost:27017/testDB';
    const client = new MongoClient(url);
    try {
        await client.connect();
        const db = client.db('testDB'); // Replace 'your_database_name' with your actual database name
        const collection = db.collection('Athletes');
        const resultsArray = [];
        for (const query of queryObject) {
            const result = await collection.find(query).toArray();
            resultsArray.push(result);
        }
        return resultsArray;
    } finally {
        await client.close();
    }
}
queryCollection(queryObject)
    .then(results => {
        console.log(results);
        // Send 'results' back to the frontend for display
    })
    .catch(err => console.error(err));