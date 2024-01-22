array = [
    [ [ '<=33', 'Node 1' ], [ '<=50', 'Node 2' ], [ '<=18', 'Größe' ] ],
    [ [ '<=33', 'Node 1' ], [ '<=50', 'Node 2' ], [ '>18', 'Größe' ] ],
    [ [ '<=33', 'Node 1' ], [ '>50', 'Node 2' ] ],
    [ [ '>33', 'Node 1' ] ]
]
array2 = [
    [ [ '>30', 'alter' ], [ 'männlich', 'geschlecht' ] ],
    [ [ '<=25', 'alter' ], [ '>=50', 'gewicht' ] ],
]
function ToJSON(data) {
    return data.map(filterRow => {
        const filterJSON = {};
            filterRow.forEach(([value, key]) => {
                    console.log(key, value)
                    filterJSON[key] = {};
                    if (key === 'geschlecht') {
                        filterJSON[key] = value;
                        return;
                    }
                    switch (value[0]) {
                        case '<':
                            if (value[1] === '=') {
                                filterJSON[key]['$lte'] = Number(value.slice(2));
                            } else {
                                filterJSON[key]['$lt'] = Number(value.slice(1));
                            }
                            break
                        case '>':
                            if (value[1] === '=') {
                                filterJSON[key]['$gte'] = Number(value.slice(2));
                            } else {
                                filterJSON[key]['$gt'] = Number(value.slice(1));
                            }
                            break
                    }
                }
            );
        return filterJSON;
    });
}
// const result = ToJSON(array2);
//console.log(result);

module.exports = ToJSON;