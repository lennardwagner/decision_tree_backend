const { MongoClient } = require("mongodb");
/*
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
*/

async function resultQuery(queryObject) {
    const url = 'mongodb://localhost:27017/testDB';
    const client = new MongoClient(url);
    try {
        await client.connect();
        const db = client.db('testDB'); // Replace 'your_database_name' with your actual database name
        const collection = db.collection('Athletes');
        const resultsArray = [];
        for (const query of queryObject) {
            console.log("FILTER: " + JSON.stringify(query, null, 2))
            const result = await collection.find(query).toArray();
            resultsArray.push(result);
        }
        resultsArray.map((element, ind1)=>element.map((ele2, ind2)=>console.log(ind1, ind2, ele2)));
        return resultsArray;
    } finally {
        await client.close();
    }
}
module.exports = resultQuery;