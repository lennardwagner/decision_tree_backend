const ToJSON = require('./ArrayToJSON')
const testTree = {
    "_id": {
        "$oid": "65ace7fc0472fb4b0be73451"
    },
    "nodes": [
        {
            "type": "custom",
            "id": "1",
            "data": {
                "label": "Node 1"
            }
        },
        {
            "type": "custom",
            "id": "2",
            "data": {
                "label": "Node 2"
            }
        },
        {
            "type": "custom",
            "id": "3",
            "data": {
                "label": "Node 3"
            }
        },
        {
            "id": "4",
            "data": {
                "label": "Größe"
            },
            "type": "custom"
        },
        {
            "id": "5",
            "data": {
                "label": "Größe"
            },
            "type": "custom"
        },
        {
            "id": "6",
            "data": {
                "label": "Age"
            },
            "type": "custom"
        },
        {
            "id": "7",
            "data": {
                "label": "Age"
            },
            "type": "custom"
        }
    ],
    "edges": [
        {
            "id": "1->2",
            "source": "1",
            "target": "2",
            "selected": true,
            "label": "<=33"
        },
        {
            "id": "1->3",
            "source": "1",
            "target": "3",
            "label": ">33"
        },
        {
            "id": "2->4",
            "source": "2",
            "target": "4",
            "data": {
                "Source->Target": [
                    "Node 2",
                    "Größe"
                ]
            },
            "selected": false,
            "label": "<=50"
        },
        {
            "id": "2->5",
            "source": "2",
            "target": "5",
            "data": {
                "Source->Target": [
                    "Node 2",
                    "Größe"
                ]
            },
            "label": ">50"
        },
        {
            "id": "4->6",
            "source": "4",
            "target": "6",
            "data": {
                "Source->Target": [
                    "Größe",
                    "Age"
                ]
            },
            "selected": false,
            "label": "<=18"
        },
        {
            "id": "4->7",
            "source": "4",
            "target": "7",
            "data": {
                "Source->Target": [
                    "Größe",
                    "Age"
                ]
            },
            "label": ">18"
        }
    ]
};
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
const result = LeafAndPathFinder(testTree, "1", [], [])
//console.log(result)
const nestedLabels = ExtractLabelsFromPaths(testTree, result.map((result2) => result2.path));
//result.map((result2) => console.log(result2.path))
console.log(ToJSON(nestedLabels));
//nestedLabels.forEach(x => console.log(x));

//console.log(result)
//for (const i of result) {console.log(i)}
module.exports = {LeafAndPathFinder,ExtractLabelsFromPaths};


