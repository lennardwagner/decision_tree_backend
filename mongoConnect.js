const {MongoClient, ObjectId} = require("mongodb");

const trimQuery = require('./TrimQuery')

const url = 'mongodb://localhost:27017/testDB';
const client = new MongoClient(url);

async function queryEdges() {
    let result = null;
    try {
        await client.connect();
        const database = client.db('testDB');
        const content = database.collection('decisionTree');
        const projection = {
            edges: 1
        };
        result = await content.find({}, { projection }).toArray();
        const cleanedResult = result.map(({ _id, edges}) => {
            const cleanedEdges = edges.map(({ id, source, target, data }) => ({ id, source, target, data }));
            return { _id, edges: cleanedEdges };
        })
        const flattenResult = result.flatMap(({ edges }) => {
            return edges.map(({ data }) => data);
        });
        result = trimQuery(cleanedResult)
        //console.log(JSON.stringify(cleanedResult, null, 2))
        //console.log(JSON.stringify(result, null, 2));
        //console.log(result)
    } finally {
        await client.close();
    }
    return result;
}
//queryEdges().catch(console.dir);
module.exports = queryEdges;
