/** Returns a JSON object which can be used as a filter criterion
 * for a mongoDB find() query
 * */
function ToJSON(data) {
    console.log(data)
    return data.map(filterRow => {
        const filterJSON = {};
        filterRow.forEach(([value, key]) => {
            key = key.toLowerCase();
                // Ignore edges without filter criteria
                if (value === 'NO LABEL') {
                    return;
                }
                filterJSON[key] = {};
                if (key === 'sex') {
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
                    case '=':
                        filterJSON[key] = Number(value.slice(1));
                        break
                    case '!':
                        filterJSON[key]['$ne'] = Number(value.slice(2));
                        break
                }
        });
        return filterJSON;
    });
}

module.exports = ToJSON;