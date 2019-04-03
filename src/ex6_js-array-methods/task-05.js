function mapMethodAnalog (array, callback) {
    var resultArray = [];
    for (let index = 0; index < array.length; index++) {
            resultArray.push(callback(array[index], index, array));
    }
    return resultArray;

}

module.exports = mapMethodAnalog;