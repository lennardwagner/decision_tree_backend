const sidebar = require('./jsons')
const suggestions = [
    [ 'Gender', 5 ],
    [ 'Node 1', 4 ],
    [ 'Node 2', 4 ],
    [ 'Age', 3 ],
    [ 'Node 3', 2 ]
]

function buildNodeOrder(nodeArray, sidebarObject) {
    // iterate over nodeArray and find the corresponding object in sidebarObject
    // -> add to node order
    const nodeOrder = {};
    console.log(nodeArray)
    nodeArray.forEach(node => {
        for (const key in sidebarObject) {
            if (sidebarObject[key]["className"] == node[0]) {
                //console.log(key, sidebarObject[key])
                const newElement = sidebarObject[key]
                nodeOrder[key] = {...newElement}
            }
        }
    })
    //console.log(nodeOrder, typeof nodeOrder)
    //console.log(JSON.stringify(nodeOrder, null, 2))
    return JSON.stringify(nodeOrder, null, 2);
}
//buildNodeOrder(suggestions, sidebar)
module.exports = buildNodeOrder;