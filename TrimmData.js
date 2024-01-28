/** Remove unnecessary parts of the reactflow json */
function trimStoredData(data) {
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

module.exports = trimStoredData;