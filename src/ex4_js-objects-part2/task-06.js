function toUpperCaseAllWords (string) {
    var newString = "";
    for (let index = 0; index < string.length; index++) {
        if (index === 0 && string.substring(index, index + 1) !== " ") {
            newString += string.substring(index, index + 1).toUpperCase();
        }
        else if (string.substring(index, index + 1) === " ") {
            newString += string.substring(index, index + 1);
            index++;
            newString += string.substring(index, index + 1).toUpperCase();                
        } else {
            newString += string.substring(index, index + 1);   
        }        
    }   

    return newString;
}

module.exports = toUpperCaseAllWords;