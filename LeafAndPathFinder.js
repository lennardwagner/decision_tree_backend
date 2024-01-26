/*
tree: JSON object representing the nodes and edges
nodeId: root node of the tree
currentPath: stores the path, pass empty Array
result: currentPath: stores the result, pass empty Array
 */
function LeafAndPathFinder(tree, nodeId, currentPath, result) {
    const node = tree.nodes.find(n => n.id === nodeId)
    if (!node) {return;}
    //currentPath.push(nodeId);
    currentPath.push([nodeId, node.data.label]);
    const outgoingEdges = tree.edges.filter((edge) => edge.source === nodeId);
    if (outgoingEdges.length === 0) {
        // This is a leaf node
        result.push({
            leafNodeId: nodeId,
            path: [...currentPath],
        });
    } else {
        for (const edge of outgoingEdges) {
            LeafAndPathFinder(tree, edge.target, currentPath, result);
        }
    }
    currentPath.pop();
    return result;
}

function ExtractLabelsFromPaths(tree, paths) {
    const stop = ""
    return paths.map((path) => {
        const labels = [];
        for (let i = 0; i < path.length - 1; i++) {
            const source = path[i][0];
            const target = path[i + 1][0];

            const edge = tree.edges.find((e) => e.source === source && e.target === target);

            if (edge && edge.label) {
                labels.push([edge.label,
                    path[i][1]]
                );}
            else if (edge.label === "") {labels.push(["NO LABEL", path[i][1]])}
            else {labels.push(["NO LABEL", path[i][1]])}
        }
        return labels;
    });
}
// const result = LeafAndPathFinder(testTree, "1", [], [])
// console.log(result)
// const nestedLabels = ExtractLabelsFromPaths(testTree, result.map((result2) => result2.path));
// result.map((result2) => console.log(result2.path))
// console.log(ToJSON(nestedLabels));
// nestedLabels.forEach(x => console.log(x));

module.exports = {LeafAndPathFinder,ExtractLabelsFromPaths};


