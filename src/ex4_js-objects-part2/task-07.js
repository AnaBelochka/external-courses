function cutString (string, number) {
    var newString = "", extraLength = 0;
    if (string.length > number) {
        extraLength = string.length - number;
        newString = string.substring(0, number - 1);
        newString += '…';
    }
    return newString;
}

module.exports = cutString;