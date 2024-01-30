testEdges = [
    [ 'Node 2', 'Gender' ],   [ 'Gender', 'Age' ],      [ 'Node 2', 'Gender' ],
    [ 'Node 2', 'Gender' ],   [ 'Gender', 'Gender' ],   [ 'Gender', 'Gender' ],
    [ 'Gender', 'Age' ],      [ 'Gender', 'Age' ],      [ 'Node 2', 'Größe' ],
    [ 'Node 2', 'Größe' ],    [ 'Größe', 'Gewicht' ],   [ 'Größe', 'Gewicht' ],
    [ 'Node 3', 'A' ],        [ 'Node 3', 'A' ],        [ 'Node 3', 'Gewicht' ],
    [ 'Node 3', 'Gewicht' ],  [ 'Gewicht', 'Gewicht' ], [ 'Gewicht', 'Gewicht' ],
    [ 'Gewicht', 'Gewicht' ], [ 'Gewicht', 'Gewicht' ], [ 'Gewicht', 'Gewicht' ],
    [ 'Gewicht', 'Gewicht' ], [ 'Gewicht', 'Gewicht' ], [ 'Gewicht', 'Gewicht' ],
    [ 'Gewicht', 'Gewicht' ], [ 'Gewicht', 'Gewicht' ], [ 'Node 2', 'Größe' ]
];

    function suggestionMap(data) {
    const hashMap = new Map();
    data.forEach(connection => {
        const connectionString = connection;
        if (hashMap.has(connectionString)) {
            hashMap.set(connectionString, hashMap.get(connectionString) + 1);
        } else {
            hashMap.set(connectionString, 1);
        }
    });
        const sortedMap = Array.from(hashMap.entries()).sort((a, b) => b[1] - a[1]);
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
    return connectionMap;
}
// result = currentSuggestionMap(testEdges);
// console.log(result)
module.exports = {suggestionMap, currentSuggestionMap};