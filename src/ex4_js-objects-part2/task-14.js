function randomValueInInterval (min, max) {
    var value = Math.round(Math.random() * 10);
    while (!(value <= max && value >= min )) {
        value = Math.round(Math.random() * 10);    
    }
    return value;
}

module.exports = randomValueInInterval;