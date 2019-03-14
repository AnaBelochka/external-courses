function evenOrOdd (array) {
    var countArrayElements = [0, 0, 0];
    array.forEach(element => {
        if (typeof(element) === 'number') {
            if (element === 0) {
                countArrayElements[2]++;    
            } else if (element%2 === 0){
                countArrayElements[0]++;
            }
            else countArrayElements[1]++;    
        }
    });
    
    return countArrayElements;
}

module.exports = evenOrOdd;