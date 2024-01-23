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
const queryNodes = require('./mongoConnect')
const suggestionMap = require('./SuggestionMap')
const buildNodeOrder = require('./SuggestionSidebar')
const { LeafAndPathFinder, ExtractLabelsFromPaths} = require('./LeafAndPathFinder')
const ArrayToJson = require('./ArrayToJSON')
const resultQuery = require('./mongoResultQuery')
const sidebar = require('./jsons')

const app = express();
const port = 3001;

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
    response.send(sidebar)
    console.log("sent sidebar info");
});

app.get("/suggestions", async (request, response) => {
    const result = await queryNodes();
    //console.log(result)
    const suggestions = suggestionMap(result);
    //console.log(suggestions)
    const responseObject = buildNodeOrder(suggestions, sidebar);
    //console.log(responseObject)
    response.send(responseObject);
    //response.status(200).json({ status: "success", suggestions: suggestions });
})
/*Post-method to export a created decision tree to the backend for storing and analyzing*/
app.post("/flow", async (request, response) => {
    const data = request.body;
    const trimmedData = trimStoredData(data);
    const trimmedDataJSON = JSON.parse(JSON.stringify(trimmedData));
    //console.log(trimmedDataJSON);
    await writeToDB(trimmedDataJSON);
    const leavesAndPaths = LeafAndPathFinder(trimmedDataJSON, "1", [], []); // logging call in ArrayToJSON.js
    const filterArray = ExtractLabelsFromPaths(trimmedDataJSON, leavesAndPaths.map((lap => lap.path)));
    //console.log(leavesAndPaths)
    const filterObject = ArrayToJson(filterArray);
    //console.log(JSON.stringify(filterObject, null, 2));
    const resultObject = await resultQuery(filterObject)
    // todo: Works (I think), but filters right now lead to empty result set as 'Node 1' is not part of the collection.
    //console.log(JSON.stringify(resultObject, null, 2));

    response.json(resultObject)
})
app.get("/currentsuggestion", async (request, response) => {
    result = await queryEdges();
    // todo: call mabBuilder here!
    console.log(result)
    response.send(result)
})
