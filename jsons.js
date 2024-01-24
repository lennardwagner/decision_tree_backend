const sidebar = {
    "node": {
        "className": "Alter",
        "content": "Alter",
        "data": {"Alter": [16, 36]}, // (min, max)
        "type": "test",
        "category": "physiology"
    },
    "node2": {
        "className": "Geschlecht", // currently not used, I think (maybe for css)!
        "content": "Geschlecht", // only used to display name in sidebar!
        "data": {"Geschlecht": ["w", "m"]},
        "type": "test2",
        "category": "physiology"
    },
    "node3": {
        "className": "Gewicht", // currently not used, I think (maybe for css)!
        "content": "Gewicht", // only used to display name in sidebar!
        "data": {"Gewicht": [50,150]},
        "type": "test3",
        "category": "physiology"
    },
    "node4": {
        "className": "Größe", // currently not used, I think (maybe for css)!
        "content": "Größe", // only used to display name in sidebar!
        "data": {"Größe": [145,220]},
        "type": "test4",
        "category": "physiology"
    },
    "node5": {
        "className": "EOF", // currently not used, I think (maybe for css)!
        "content": "EOF", // only used to display name in sidebar!
        "data": "null",
        "type": "test5",
        "category": "functional"
    },
    "node6": {
        "className": "Sprunghöhe", // currently not used, I think (maybe for css)!
        "content": "Sprunghöhe", // only used to display name in sidebar!
        "data": {"Sprunghöhe": [0,110]},
        "type": "test6",
        "category": "training"
    }
};
module.exports = sidebar;