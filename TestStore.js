// function which receives the POST from the front-end,
// removes the unneeded(?) JSON parts,
// for each edge stores which node is source and which is target,
// updates a Hashmap with source->target as key and amount of times as value.

// For recommendations:
// Suggest the most used connections.
// Potentially need to live update the current tree such that the latest node can be found out and checked
// what most often succeeds it to update suggestions.

// data: POST request.body
function testStore(data) {
    let trimmedData = {...data};
    delete trimmedData.viewport;
    delete trimmedData.nodes.forEach(node => {
        delete node.height;
        delete node.width;
        delete node.position;
        delete node.positionAbsolute;
        delete node.style;
        delete node.sourcePosition;
        delete node.targetPosition;
    });
    delete trimmedData.edges.forEach(edge => {
        delete edge.type;
        delete edge.markerEnd;
        delete edge.pathOptions;
        delete edge.style;
    });
    return trimmedData;
}

module.exports = testStore;