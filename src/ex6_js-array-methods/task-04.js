function filterMethodAnalog (array, callback) {
    var resultArray = [];
    for (let index = 0; index < array.length; index++) {
        if (callback(array[index], index, array)) {
            resultArray.push(array[index]);
        }        
    }

    return resultArray;

}

module.exports = filterMethodAnalog;