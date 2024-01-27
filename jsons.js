const sidebar = {
    "node": {
        "className": "Age",
        "content": "Age",
        "data": {"Age": [15, 35]}, // (min, max)
        "type": "test",
        "category": "physiology"
    },
    "node2": {
        "className": "Sex", // currently not used, I think (maybe for css)!
        "content": "Sex", // only used to display name in sidebar!
        "data": {"Sex": ["male", "female"]},
        "type": "test2",
        "category": "physiology"
    },
    "node3": {
        "className": "Weight", // currently not used, I think (maybe for css)!
        "content": "Weight",
        "data": {"Weight": [50,150]}, // Kg
        "type": "test3",
        "category": "physiology"
    },
    "node4": {
        "className": "Height",
        "content": "Height",
        "data": {"Height": [145,220]}, // centimeters
        "type": "test4",
        "category": "physiology"
    },
    "node5": {
        "className": "Results",
        "content": "Results",
        "data": "null",
        "type": "test5",
        "category": "functional"
    },
    "node6": {
        "className": "High Jump",
        "content": "High Jump",
        "data": {"High Jump": [130,245]}, // centimeters
        "type": "test6",
        "category": "training"
    },
    "node7": {
        "className": "30m",
        "content": "30m",
        "data": {"30m": [3.7,5.0]}, // seconds
        "type": "test7",
        "category": "training"
    },
    "node8": {
        "className": "Bench Press",
        "content": "Bench Press",
        "data": {"Bench Press": [40,200]}, // Kg
        "type": "test8",
        "category": "training"
    },
    "node9": {
        "className": "IQ",
        "content": "IQ",
        "data": {"IQ": [70,130]},
        "type": "test9",
        "category": "cognition"
    },
    "node10": {
        "className": "Resting Heartrate",
        "content": "Resting Heartrate",
        "data": {"Resting Heartrate": [55,80]}, // bpm
        "type": "test10",
        "category": "physiology"
    },
    "node11": {
        "className": "Reaction Time",
        "content": "Reaction Time",
        "data": {"Reaction Time": [100,350]}, // visual
        "type": "test11",
        "category": "training"
    },
    "node12": {
        "className": "Vitamin D",
        "content": "Vitamin D",
        "data": {"Vitamin D": [20,50]}, // ng/mL
        "type": "test12",
        "category": "physiology"
    },
    "node13": {
        "className": "Peak Heartrate",
        "content": "Peak Heartrate",
        "data": {"Peak Heartrate": [150,200]}, // bpm
        "type": "test13",
        "category": "physiology"
    },
};
module.exports = sidebar;