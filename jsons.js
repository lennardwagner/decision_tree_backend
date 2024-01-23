const sidebar = {
    "node": {
        "className": "Alter",
        "content": "Alter",
        "data": {"Alter": [16, 36]}, // (min, max)
        "type": "test"
    },
    "node2": {
        "className": "Geschlecht", // currently not used, I think (maybe for css)!
        "content": "Geschlecht", // only used to display name in sidebar!
        "data": {"Geschlecht": ["w", "m"]},
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
    },
    "node5": {
        "className": "EOF", // currently not used, I think (maybe for css)!
        "content": "EOF", // only used to display name in sidebar!
        "data": "null",
        "type": "test5"
    }
};
module.exports = sidebar;