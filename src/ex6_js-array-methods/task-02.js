function someMethodAnalog (array, callback) {
    for (let index = 0; index < array.length; index++) {
        if (callback(array[index], index, array)) {
            return true;
        }        
    }

    return false;

}

module.exports = someMethodAnalog;