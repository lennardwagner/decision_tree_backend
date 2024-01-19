function trimQuery(data) {
    let trimmedData = {...data};
    trimmedData = JSON.stringify(trimmedData, null, 2)
    //console.log(trimmedData)
    trimmedData = JSON.parse(trimmedData)
    //const test = Object.values(trimmedData).forEach(x => console.log(x))
    //console.log(test)
    //console.log(JSON.stringify(trimmedData, null, 2))
    const dataArray = Object.values(trimmedData).flatMap(({ edges }) => {
        //console.log(edges)
        return edges.map(content => content.data);
    }).filter(data => data)
        .map(row => Object.values(row)[0]);
    //console.log(dataArray)
    return dataArray
}
module.exports = trimQuery;