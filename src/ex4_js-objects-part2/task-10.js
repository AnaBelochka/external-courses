function reverseString (string) {
    var newString = "";
    for (let index = string.length; index > 0; index--) {
        newString += string.substring(index-1, index);        
    }
    return newString;
}

module.exports = reverseString;