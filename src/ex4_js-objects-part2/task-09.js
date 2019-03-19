function addSubstring (string, substring, number) {
    var countWord = 0, newString = "";
    for (let index = 0; index < string.length; index++) {
        if (countWord === number + 1) {
            countWord++;
            newString += substring + " " + string.substring(index, index + 1);    
        }
        else if (string.substring(index, index + 1) === " ") {
            newString += string.substring(index, index + 1);
            countWord++;
        } else {
            newString += string.substring(index, index + 1);
        }      
    }
    return newString;
}

module.exports = addSubstring;