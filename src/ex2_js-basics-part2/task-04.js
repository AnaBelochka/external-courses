function searchMatches (array) {
    for (var index = 0; index < array.length-1; index++) {
        if (array[index] !== array[index+1]) {
            return false;    
        }    
    }
    return true;
}

module.exports = searchMatches;