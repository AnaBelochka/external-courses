function everyMethodAnalog (array, callback) {
    for (let index = 0; index < array.length; index++) {
        if (!callback(array[index], index, array)) {
            return false;
        }        
    }

    return true;

}

module.exports = everyMethodAnalog;