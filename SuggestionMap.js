const hashMap = new Map();
function suggestionMap(data) {
    data.forEach(connection => {
        //console.log(connection)
        const connectionString = connection;
        //const connectionString = JSON.stringify(connection);
        //console.log(connectionString)
        //console.log(connection.toString())
        if (hashMap.has(connectionString)) {
            //console.log("found a connection " + connection)
            hashMap.set(connectionString, hashMap.get(connectionString) + 1);
        } else {
            //console.log("did not exist yet: " + connection)
            hashMap.set(connectionString, 1);
        }
    });
        console.log(hashMap)
        const sortedMap = Array.from(hashMap.entries()).sort((a, b) => b[1] - a[1]);
        console.log(sortedMap)
        return sortedMap.slice(0, 5);

}

module.exports = suggestionMap;