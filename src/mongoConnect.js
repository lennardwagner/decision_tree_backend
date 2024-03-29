const {MongoClient, ObjectId} = require("mongodb");

const trimQueryEdges = require('./TrimQuery')
const trimQueryNodes = require('./TrimQuery')

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
        result = trimQueryEdges(cleanedResult)
    } finally {
        await client.close();
    }
    return result;
}

async function queryNodes() {
    let result = null;
    try {
        await client.connect();
        const database = client.db('testDB');
        const content = database.collection('decisionTree');
        const projection = {
            nodes: 1
        };
        result = await content.find({}, { projection }).toArray();
        const cleanedResult = result.flatMap(({ nodes }) => {
            const dataValues = Object.values(nodes).map(x => Object.values(x.data));
            return dataValues;
        });
        result = cleanedResult.flat()
    } finally {
        await client.close();
    }
    return result;
}

module.exports = {queryEdges, queryNodes};