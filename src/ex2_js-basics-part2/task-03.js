function evenOrOdd (array) {
    var countOdd = countEven = countZero = 0;
    array.forEach(element => {
        if (typeof(element) === 'number') {
            if (element === 0) {
                countZero++;    
            } else if (element%2 === 0){
                countEven++;
            }
            else countOdd++;    
        }
    });
    
    return [countEven, countOdd, countZero];
}

module.exports = evenOrOdd;