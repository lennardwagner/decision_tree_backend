const sidebar = {
    "node": {
        "className": "Age",
        "content": "Age",
        "data": {"age": [16, 36]}, // (min, max)
        "type": "test"
    },
    "node2": {
        "className": "Gender", // currently not used, I think (maybe for css)!
        "content": "Gender", // only used to display name in sidebar!
        "data": {"gender": ["female", "male"]},
        "type": "test2"
    },
    "node3": {
        "className": "Gewicht", // currently not used, I think (maybe for css)!
        "content": "Gewicht", // only used to display name in sidebar!
        "data": {"Gewicht": [50,150]},
        "type": "test3"
    },
    "node4": {
        "className": "Größe", // currently not used, I think (maybe for css)!
        "content": "Größe", // only used to display name in sidebar!
        "data": {"Größe": [145,220]},
        "type": "test4"
    }
};
module.exports = sidebar;