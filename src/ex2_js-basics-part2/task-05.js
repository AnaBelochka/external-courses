function maxElementOfTheArray (array) {
    maxElement = 0;
    array.forEach(element => {
        if (element > maxElement) {
            maxElement = element;    
        }
    });

    return maxElement;
}

module.exports = maxElementOfTheArray;