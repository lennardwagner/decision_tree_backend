testEdges = [
    [ 'Node 2', 'Gender' ],   [ 'Gender', 'Age' ],      [ 'Node 2', 'Gender' ],
    [ 'Node 2', 'Gender' ],   [ 'Gender', 'Gender' ],   [ 'Gender', 'Gender' ],
    [ 'Gender', 'Age' ],      [ 'Gender', 'Age' ],      [ 'Node 2', 'Größe' ],
    [ 'Node 2', 'Größe' ],    [ 'Größe', 'Gewicht' ],   [ 'Größe', 'Gewicht' ],
    [ 'Node 3', 'A' ],        [ 'Node 3', 'A' ],        [ 'Node 3', 'Gewicht' ],
    [ 'Node 3', 'Gewicht' ],  [ 'Gewicht', 'Gewicht' ], [ 'Gewicht', 'Gewicht' ],
    [ 'Gewicht', 'Gewicht' ], [ 'Gewicht', 'Gewicht' ], [ 'Gewicht', 'Gewicht' ],
    [ 'Gewicht', 'Gewicht' ], [ 'Gewicht', 'Gewicht' ], [ 'Gewicht', 'Gewicht' ],
    [ 'Gewicht', 'Gewicht' ], [ 'Gewicht', 'Gewicht' ], [ 'Node 2', 'Größe' ]];

    function suggestionMap(data) {
    // map could also be outside of function, this way each time suggestion is requested, the map
    // is reset and computed from scratch
    const hashMap = new Map();
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
        //console.log(hashMap)
        const sortedMap = Array.from(hashMap.entries()).sort((a, b) => b[1] - a[1]);
        //console.log(sortedMap)
        return sortedMap.slice(0, 5);

}
function currentSuggestionMap(edges) {
    const connectionMap = new Map;
    edges.forEach(([source, target]) => {
        if (!connectionMap.has(source)) {
            connectionMap.set(source, []);
        }
        const existingConnection = connectionMap.get(source).find(
            ([targetNode]) => targetNode === target);
        if (existingConnection !== undefined) {
            // If it exists, increment the frequency
            existingConnection[1]++;
        } else {
            // If it doesn't exist, add a new entry with frequency 1
            connectionMap.get(source).push([target, 1]);
        }
    });
    //console.log(connectionMap)
    return connectionMap;
}
//result = currentSuggestionMap(testEdges);
//    console.log(result)
module.exports = {suggestionMap, currentSuggestionMap};