// app.js
const express = require('express');
const cors = require('cors');
const {request, response} = require("express");
const bodyParser = require('body-parser');
const fs = require('fs');
const {MongoClient, ObjectId} = require("mongodb");

const trimStoredData = require('./TestStore');
const writeToDB = require('./mongoUpdate')
const { queryEdges, queryNodes } = require('./mongoConnect')
const { suggestionMap, currentSuggestionMap } = require('./SuggestionMap')
const buildNodeOrder = require('./SuggestionSidebar')
const { LeafAndPathFinder, ExtractLabelsFromPaths} = require('./LeafAndPathFinder')
const ArrayToJson = require('./ArrayToJSON')
const resultQuery = require('./mongoResultQuery')
const sidebar = require('./jsons')

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

let lastNode = ""
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
    console.log(Date.now(), "sent sidebar info");

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

    await writeToDB(file = trimmedDataJSON, collection = "decisionTree");
    const leavesAndPaths = LeafAndPathFinder(trimmedDataJSON, "1", [], []);
    // only Result nodes are valid leafs.
    const validLeafs = leavesAndPaths.filter(item => item.path.length > 0 && item.path[item.path.length - 1][1] === "Results");
    const filterArray = ExtractLabelsFromPaths(trimmedDataJSON, leavesAndPaths.map((lap => lap.path)));
    const filterObject = ArrayToJson(filterArray);

    const resultObject = await resultQuery(filterObject)

    response.json(resultObject);
})
app.post("/treeconstruction", async (request, response) => {
    const data = request.body;
    data.timestamp = String(new Date());
    //console.log(data);
    writeToDB(file = data, collection = "TreeConstructionSteps");
    response.status(200).send("Data received successfully");
})

/** To return a suggestion, the last dropped node needs to be passed from the frontend */
app.post("/sendlastnode", async (request, response) => {
    const data = request.body;
    if (data.nodeLabel !== "Results") {
        lastNode = data;
        //console.log("Last node received: " + JSON.stringify(data.nodeLabel, null, 2));
    }
    response.status(200).send("Data received successfully");
});
app.get("/currentsuggestion", async (request, response) => {
    //console.log("called current suggestion")
    const result = await queryEdges();
    const currentMap = currentSuggestionMap(result)
    if (lastNode !== "") {
        const suggestions = currentMap.get(lastNode.nodeLabel)
        if (suggestions === undefined) {response.send({})} else {
        const responseObject =  buildNodeOrder(suggestions, sidebar);
        //console.log("Sending the following suggestion: " + responseObject)
        response.send(responseObject) }
    } else {
        response.send({})
    }
});
