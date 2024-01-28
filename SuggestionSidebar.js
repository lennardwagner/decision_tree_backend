/* --- for testing ---
const sidebar = require('./jsons')
const suggestions = [
    [ 'Gender', 5 ],
    [ 'Node 1', 4 ],
    [ 'Node 2', 4 ],
    [ 'Age', 3 ],
    [ 'Node 3', 2 ]
]*/

function buildNodeOrder(nodeArray, sidebarObject) {
    const nodeOrder = {};
    nodeArray.forEach(node => {
        for (const key in sidebarObject) {
            if (sidebarObject[key]["className"] == node[0]) {
                const newElement = sidebarObject[key]
                nodeOrder[key] = {...newElement}
            }
        }
    })
    return JSON.stringify(nodeOrder, null, 2);
}
// buildNodeOrder(suggestions, sidebar)
module.exports = buildNodeOrder;