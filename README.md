## Backend for [this](https://github.com/lennardwagner/in_prove_decision_tree) corresponding react frontend

### Getting Started
Prerequisites: <br>
* Node.js v20.10.0
* MongoDB v7.0.5
* Mongosh v2.1.1

Copy this repository to your local machine,
make sure the project folder is your current working directory and then
install all dependencies from the ``package.json`` by running:
```sh
npm install
```
If prompted to do so, follow up by running:
```sh
npm audit fix
```
Start the backend by running ``src/app.js``. By default, the server is configured to listen at ``http://localhost:3001``


## Database
For the backend to work properly a local MongoDB instance
must be installed. Currently, this connection string is used: ``mongodb://localhost:27017/testDB``
to connect to a database called ``testDB`` but yours may differ.<br>
Ideally, these three collections should exist:
* ``Athletes``
* ``TreeConstructionSteps``
* ``decisionTree``

Once set up the ``Athletes`` collection must be filled with the ``example_athletes.json``
found at ``src/data/mongoJSONS/example_athletes.json``
