// app.js
const express = require('express');
const cors = require('cors');
const {request, response} = require("express");
const bodyParser = require('body-parser');
const fs = require('fs');

const testStore = require('./TestStore');


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

app.get("/suggestions", (request, response) => {
    // function call / function to retrieve suggested next nodes goes here.
})
app.post("/flow", (request, response) => {
    const data = request.body;
    const filePath = "./storage/db.txt";
    const trimmedData = testStore(data);
    fs.appendFile(filePath, `${JSON.stringify(trimmedData, null, 2)}\n`, (err) => {
        if (err) {
            console.error('Error saving JSON data:', err);
            response.status(500).send({ error: 'Error saving JSON data' });
        } else {
            console.log('JSON data saved successfully.');
            response.status(200).send({ message: 'JSON data saved successfully' });
        }
    });

})

// continue here: https://www.mongodb.com/developer/languages/javascript/node-connect-mongodb/

// https://stackblitz.com/edit/stackblitz-starters-tkpczr?file=src%2Fcomponents%2FModal%2FModal.jsx,src%2Fcomponents%2FNewsletterModal%2FNewsletterModal.jsx
