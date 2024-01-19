// app.js
const express = require('express');
const cors = require('cors');
const {request, response} = require("express");
const bodyParser = require('body-parser');
const fs = require('fs');
const {MongoClient, ObjectId} = require("mongodb");

const trimStoredData = require('./TestStore');
const writeToDB = require('./mongoUpdate')
const queryEdges = require('./mongoConnect')

const app = express();
const port = 3001;

const url = 'mongodb://localhost:27017/testDB';
const client = new MongoClient(url);
// ===========================DB TEST========================================
/*
async function run() {
    try {
        await client.connect();
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
*/
// ==========================================================================
app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
app.get("/status", (request, response) => {
    const status = {
        "Status": "Running"
    };

    response.send(status)
});
app.get("/sidebar", (request, response) => {
    const sidebar = {
        "node": {
            "className": "Age",
            "content": "Age",
            "data": {"age": [16, 36]}, // (min, max)
            "type": "test"
        },
        "node2": {
            "className": "Gender", // currently not used, I think (maybe for css)!
            "content": "Gender", // only used to display name in sidebar!
            "data": {"gender": ["female", "male"]},
            "type": "test2"
        }
    }

    response.send(sidebar)
    console.log("sent sidebar info");
});

app.get("/suggestions", async (request, response) => {
    const result = await queryEdges();
    console.log(result)
    response.status(200).json({ status: "success", suggestions: result });
})
app.post("/flow", (request, response) => {
    const data = request.body;
    const trimmedData = trimmedDataJSON(data);
    const trimmedDataJSON = JSON.parse(JSON.stringify(trimmedData));
    console.log(trimmedDataJSON);
    writeToDB(trimmedDataJSON)
    /*fs.appendFile(filePath, `${JSON.stringify(trimmedData, null, 2)}\n`, (err) => {
        if (err) {
            console.error('Error saving JSON data:', err);
            response.status(500).send({ error: 'Error saving JSON data' });
        } else {
            console.log('JSON data saved successfully.');
            response.status(200).send({ message: 'JSON data saved successfully' });
        }
    }
    ); */
})
