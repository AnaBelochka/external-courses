function reduceMethodAnalog (array, callback, initialValue) {
    var firstElementOfArray = 0, result = initialValue;
    if (typeof arguments[2] === "undefined") {
        result = array[0];
        firstElementOfArray = 1;
    }
    for (let index = firstElementOfArray; index < array.length; index++) {
        result = callback(result, array[index], index, array);    
    }

    return result;

}

module.exports = reduceMethodAnalog;